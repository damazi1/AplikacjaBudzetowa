package pczstudent.pracainz.budgetmanagementapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pczstudent.pracainz.budgetmanagementapp.dto.*;
import pczstudent.pracainz.budgetmanagementapp.model.*;
import pczstudent.pracainz.budgetmanagementapp.model.Currency;
import pczstudent.pracainz.budgetmanagementapp.repository.AccountRepository;
import pczstudent.pracainz.budgetmanagementapp.repository.TransactionRepository;
import pczstudent.pracainz.budgetmanagementapp.model.PaymentAcc;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final WalletService walletService;
    private final AccountService accountService;
    private final AccountRepository accountRepository;

    public Transaction walletNewTransaction(Transaction transaction){
        Wallet wallet = walletService.getWalletById(transaction.getWalletId());
        wallet.setBalance(wallet.getBalance()+(transaction.getAmount()));
        walletService.updateWallet(wallet);
        return transactionRepository.save(transaction);
    }
    public Collection<Transaction> periodTransactions(String walletId, Date startDate, Date endDate){
        return transactionRepository.findByWalletIdAndDateBetween(walletId, startDate, endDate);
    }
    public WalletExpensesAndIncome totalPiriodBalance(String walletId, Date startDate, Date endDate){
        Collection<Transaction> allPeriodTransactions = transactionRepository.findByWalletIdAndDateBetween(walletId, startDate, endDate);
        double totalIncome = allPeriodTransactions.stream()
                .filter(t -> t.getAmount() > 0)
                .mapToDouble(Transaction::getAmount)
                .sum();
        double totalExpenses = allPeriodTransactions.stream()
                .filter(t -> t.getAmount() < 0)
                .mapToDouble(Transaction::getAmount)
                .sum();
        double netBalance = totalIncome + totalExpenses;
        return new WalletExpensesAndIncome()
                .setTotalIncome(totalIncome)
                .setTotalExpenses(totalExpenses)
                .setBalanceChange(netBalance);
    }

    public Transaction accountNewTransaction(Transaction transaction){
        Account account = accountService.getAccountDetails(transaction.getAccountId());
        account.setBalance(account.getBalance()+(transaction.getAmount()));
        accountService.updateAccount(account);
        return transactionRepository.save(transaction);
    }

    public Transaction accountNewTransfer(Transaction transaction){
        Account fromAccount = accountService.getAccountDetails(transaction.getAccountId());
        Account toAccount = accountService.getAccountDetails(transaction.getAccountToId());
        fromAccount.setBalance(fromAccount.getBalance() - Math.abs(transaction.getAmount()));
        if (fromAccount.getCurrency().equals(toAccount.getCurrency())) {
            toAccount.setBalance(toAccount.getBalance() + Math.abs(transaction.getAmount()));
        } else {
            Currency currency = fromAccount.getCurrency();
            double exchangeRate = currency.getToUSDExchangeRate(); // 0.22
            double amountInUSD = transaction.getAmount()*exchangeRate;
            Currency toCurrency = toAccount.getCurrency();
            double toExchangeRate = toCurrency.getToUSDExchangeRate(); // 0.13
            double toAmountInUsd = toAccount.getBalance()*toExchangeRate;
            double finalAmount = amountInUSD + toAmountInUsd;
            double convertBack = toCurrency.getFromUSDExchangeRate();
            toAccount.setBalance(Math.round((finalAmount * convertBack)* 100.0) / 100.0);
        }
        accountService.updateAccount(fromAccount);
        accountService.updateAccount(toAccount);
        return transactionRepository.save(transaction);
    }

    public List<Transaction> allAccountTransactions(String accountId){
        List<Transaction> transactions = transactionRepository.findAllByAccountIdOrAccountToIdOrderByDateDesc(accountId, accountId);
        transactions.forEach(t -> {
            if (!Objects.equals(t.getAccountToId(), accountId) && t.getAccountToId() != null) {
                t.setAmount(t.getAmount()*-1);
            }
        });
        return transactions;

    }

    public double allUserTransactionsSum(String userId) {
        List<Account> userAccounts = accountService.getAccountByUserId();
        double totalSum = 0;
        for (Account account : userAccounts) {
            Currency currency = account.getCurrency();
            double exchangeRate = currency.getToUSDExchangeRate();
            totalSum += account.getBalance()*exchangeRate;
        }
        List<Wallet> userWallets = walletService.getWalletByUserId(userId);
        for (Wallet wallet : userWallets) {
            Currency currency = wallet.getCurrency();
            double exchangeRate = currency.getToUSDExchangeRate();
            totalSum += wallet.getBalance()*exchangeRate;
        }
        return totalSum;
    }

    public double currencyExchange(Transaction transaction, PaymentAcc acc, Currency toCurrency) {
        Currency currency = acc.getCurrency();
        double exchangeRate = currency.getToUSDExchangeRate();
        double inUSD = transaction.getAmount()*exchangeRate;
        double toExchangeRate = toCurrency.getFromUSDExchangeRate();
        double result = Math.round((inUSD * toExchangeRate) * 100.0) / 100.0;
        if (result - transaction.getAmount() < 1 && result - transaction.getAmount() > -1) {
            return transaction.getAmount();
        }
        return result;
    }

    public Map<LocalDate, List<Transaction>> transactionsGroupedByDate(Collection<Transaction> transactions, ZoneId zoneId) {
        return transactions.stream()
                .collect(Collectors.groupingBy(t ->
                        t.getDate().toInstant().atZone(zoneId).toLocalDate()
                ));
    }

    public Collection<Transaction> getAllTransactionForAccount(PeriodChangeDto account) {
        Collection<Transaction> transactions = transactionRepository.findByAccountIdAndDateBetween(
                account.getId(),
                account.getFrom(),
                account.getTo()
        );
        Collection<Transaction> transactionsFrom = transactionRepository.findByAccountToIdAndDateBetween(
                account.getId(),
                account.getFrom(),
                account.getTo()
        );
        Currency accountCurrency = accountService.getAccountDetails(account.getId()).getCurrency();
        for (Transaction transaction : transactionsFrom) {
            double convertedAmount = currencyExchange(transaction, accountService.getAccountDetails(transaction.getAccountId()), accountCurrency);
            transaction.setAmount(convertedAmount);
        }
        transactions.addAll(transactionsFrom);
        return transactions;
    }

    public List<WalletPieChartDto> getPieChartData(PeriodChangeDto wallet, String operator) {
        Collection<Transaction> transactions = transactionRepository.findByWalletIdAndDateBetween(wallet.getId(), wallet.getFrom(), wallet.getTo());
        List<WalletPieChartDto> pieChartData = transactions.stream()
                .filter(t -> operator.equals("income") ? t.getAmount() > 0 : t.getAmount() < 0)
                .collect(HashMap<String, Double>::new,
                        (map, t) -> {
                            String category = t.getCategory() != null ? t.getCategory() : "Uncategorized";
                            map.put(category, map.getOrDefault(category, 0.0) + Math.abs(t.getAmount()));
                        },
                        HashMap::putAll)
                .entrySet()
                .stream()
                .map(entry -> {
                    WalletPieChartDto dto = new WalletPieChartDto();
                    dto.category = entry.getKey();
                    dto.amount = entry.getValue();
                    return dto;
                })
                .toList();

        return pieChartData;
    }

    public List<WalletBarChartDto> getBarChartData(PeriodChangeDto wallet){
        Collection<Transaction> transactions = transactionRepository.findByWalletIdAndDateBetween(
                wallet.getId(),
                wallet.getFrom(),
                wallet.getTo()
        );

        return getWalletBarChartDtos(wallet, transactions);
    }

    public List<WalletLineChartDto> getLineChartData(PeriodChangeDto wallet) {
        // Pobierz transakcje z wybranego okresu
        Collection<Transaction> transactions = transactionRepository.findByWalletIdAndDateBetween(
                wallet.getId(),
                wallet.getFrom(),
                wallet.getTo()
        );


        Wallet walletEntity = walletService.getWalletById(wallet.getId());
        double currentBalance = walletEntity.getBalance();

        double periodSum = transactions.stream().mapToDouble(Transaction::getAmount).sum();
        double balanceBeforePeriod = currentBalance - periodSum;

        ZoneId zoneId = ZoneId.of("UTC");

        Map<LocalDate, List<Transaction>> transactionsByDate = transactionsGroupedByDate(transactions, zoneId);

        List<WalletLineChartDto> walletLineChartDtos = new ArrayList<>();
        LocalDate currentDate = wallet.getFrom().toInstant().atZone(zoneId).toLocalDate();
        LocalDate endDate = wallet.getTo().toInstant().atZone(zoneId).toLocalDate();
        double runningBalance = balanceBeforePeriod;

        // Iteruj przez wszystkie dni w okresie
        while (!currentDate.isAfter(endDate)) {
            // Dodaj transakcje z tego dnia do bilansu
            List<Transaction> dailyTransactions = transactionsByDate.getOrDefault(currentDate, Collections.emptyList());
            double dailyChange = dailyTransactions.stream()
                    .mapToDouble(Transaction::getAmount)
                    .sum();

            runningBalance += dailyChange;

            // Utwórz DTO dla tego dnia
            WalletLineChartDto dto = new WalletLineChartDto();
            dto.date = Date.from(currentDate.atStartOfDay(zoneId).toInstant());
            dto.balance = runningBalance;
            walletLineChartDtos.add(dto);

            currentDate = currentDate.plusDays(1);
        }

        return walletLineChartDtos;
    }

    public List<WalletBarChartDto> getBarChartAccountData(PeriodChangeDto account) {
        Collection<Transaction> transactions = getAllTransactionForAccount(account);

        return getWalletBarChartDtos(account, transactions);
    }

    private List<WalletBarChartDto> getWalletBarChartDtos(PeriodChangeDto account, Collection<Transaction> transactions) {
        ZoneId zone = ZoneId.of("UTC");

        Map<LocalDate, List<Transaction>> transactionsByDate = transactionsGroupedByDate(transactions, zone);

        List<WalletBarChartDto> result = new ArrayList<>();
        LocalDate currentDate = account.getFrom().toInstant().atZone(zone).toLocalDate();
        LocalDate endDate = account.getTo().toInstant().atZone(zone).toLocalDate();


        while (!currentDate.isAfter(endDate)) {
            List<Transaction> dailyTransactions = transactionsByDate.getOrDefault(currentDate, Collections.emptyList());

            double income = dailyTransactions.stream()
                    .filter(t -> t.getAmount() > 0)
                    .mapToDouble(Transaction::getAmount)
                    .sum();

            double expenses = Math.abs(dailyTransactions.stream()
                    .filter(t -> t.getAmount() < 0)
                    .mapToDouble(Transaction::getAmount)
                    .sum());

            WalletBarChartDto dto = new WalletBarChartDto();
            dto.date = Date.from(currentDate.atStartOfDay(zone).toInstant()); // Ta sama strefa
            dto.income = income;
            dto.expenses = expenses;
            result.add(dto);

            currentDate = currentDate.plusDays(1);
        }


        return result;
    }

    public List<WalletLineChartDto> getLineChartAccountData(PeriodChangeDto account) {
        Collection<Transaction> transactions = getAllTransactionForAccount(account);
        Account accountEntity = accountService.getAccountDetails(account.getId());
        double currentBalance = accountEntity.getBalance();

        double periodSum = transactions.stream().mapToDouble(Transaction::getAmount).sum();
        double balanceBeforePeriod = currentBalance - periodSum;

        ZoneId zoneId = ZoneId.of("UTC");

        Map<LocalDate, List<Transaction>> transactionsByDate = transactionsGroupedByDate(transactions, zoneId);

        List<WalletLineChartDto> accountLineChartDto = new ArrayList<>();
        LocalDate currentDate = account.getFrom().toInstant().atZone(zoneId).toLocalDate();
        LocalDate endDate = account.getTo().toInstant().atZone(zoneId).toLocalDate();
        double runningBalance = balanceBeforePeriod;

        // Iteruj przez wszystkie dni w okresie
        while (!currentDate.isAfter(endDate)) {
            // Dodaj transakcje z tego dnia do bilansu
            List<Transaction> dailyTransactions = transactionsByDate.getOrDefault(currentDate, Collections.emptyList());
            double dailyChange = dailyTransactions.stream()
                    .mapToDouble(Transaction::getAmount)
                    .sum();

            runningBalance += dailyChange;

            // Utwórz DTO dla tego dnia
            WalletLineChartDto dto = new WalletLineChartDto();
            dto.date = Date.from(currentDate.atStartOfDay(zoneId).toInstant());
            dto.balance = runningBalance;
            accountLineChartDto.add(dto);

            currentDate = currentDate.plusDays(1);
        }

        return accountLineChartDto;
    }
}
