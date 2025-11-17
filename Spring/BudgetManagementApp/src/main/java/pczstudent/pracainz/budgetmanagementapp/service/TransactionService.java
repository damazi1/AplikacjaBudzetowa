package pczstudent.pracainz.budgetmanagementapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pczstudent.pracainz.budgetmanagementapp.dto.PeriodChangeDto;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletExpensesAndIncome;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletPeriodDto;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletPieChartDto;
import pczstudent.pracainz.budgetmanagementapp.model.Account;
import pczstudent.pracainz.budgetmanagementapp.model.Currency;
import pczstudent.pracainz.budgetmanagementapp.model.Transaction;
import pczstudent.pracainz.budgetmanagementapp.model.Wallet;
import pczstudent.pracainz.budgetmanagementapp.repository.TransactionRepository;

import java.util.*;

@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final WalletService walletService;
    private final AccountService accountService;

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

}
