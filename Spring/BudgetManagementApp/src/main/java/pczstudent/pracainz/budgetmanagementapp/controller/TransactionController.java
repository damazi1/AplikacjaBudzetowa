package pczstudent.pracainz.budgetmanagementapp.controller;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletExpensesAndIncome;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletPeriodDto;
import pczstudent.pracainz.budgetmanagementapp.model.*;
import pczstudent.pracainz.budgetmanagementapp.repository.*;
import pczstudent.pracainz.budgetmanagementapp.service.TransactionService;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/Transaction")
@AllArgsConstructor
public class TransactionController {

    private TransactionRepository transactionRepository;
    private TransferRepository transferRepository;
    private AccountRepository accountRepository;
    private DepositRepository depositRepository;
    private WithdrawalRepository withdrawalRepository;

    private final TransactionService transactionService;

    @PostMapping("/wallet/newTransaction")
    public ResponseEntity<Transaction> newTransaction(@Valid @RequestBody Transaction transaction, @RequestParam String walletId) {
        transaction.setWalletId(walletId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        transaction.setUserId(currentUser.getId());
        Transaction savedTransaction = transactionService.walletNewTransaction(transaction);
        return ResponseEntity.ok(savedTransaction);
    }

    @GetMapping("/wallet/periodTransactions")
    public ResponseEntity<List<Transaction>> getPeriodTransactions
            (@RequestParam String walletId,
             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date startDate,
             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date endDate) {
        Date from = startDate;
        Date to = endDate;
        List<Transaction> transactions = (List<Transaction>)
                transactionService.periodTransactions(walletId, from, to);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/wallet/totalPeriodBalance")
    public ResponseEntity<WalletExpensesAndIncome> getTotalPeriodBalance (
            @RequestParam String walletId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date endDate) {
        Date from = startDate;
        Date to = endDate;
        WalletExpensesAndIncome balance =
                transactionService.totalPiriodBalance(walletId, from, to);
        return ResponseEntity.ok(balance);
    }

    @PostMapping("/create/transfer")
    public String createTransfer(@Valid @RequestBody Transfer transfer) {
        if (accountRepository.findByNumber(transfer.getFromAccountNumber()).isEmpty() ||
                accountRepository.findByNumber(transfer.getToAccountNumber()).isEmpty()) {
            return "Invalid account numbers provided for transfer";
        }


        Transaction transaction = new Transaction();
        transaction.setTransactionType(TransactionTypes.TRANSFER);
        transaction.setAccountId(transfer.getFromAccountNumber());
        transaction.setTransactionStatus(TransactionStatus.PENDING);
        transaction.setAmount(transfer.getAmount());
        transaction.setDescription("Transfer to account " + transfer.getToAccountNumber());

        transactionRepository.save(transaction);

        Account from = accountRepository.findByNumber(transfer.getFromAccountNumber()).orElseThrow(() -> new RuntimeException("Account not found"));
        Account to = accountRepository.findByNumber(transfer.getToAccountNumber()).orElseThrow(() -> new RuntimeException("Account not found"));

        if (transfer.getAmount() > from.getBalance()){
            transaction.setTransactionStatus(TransactionStatus.FAILED);
            transaction.setDescription("Insufficient balance for transfer");
            transactionRepository.save(transaction);
            return "Insufficient balance for transfer";
        }

        from.setBalance(from.getBalance() - transfer.getAmount());
        to.setBalance(to.getBalance() + transfer.getAmount());

        accountRepository.save(from);
        accountRepository.save(to);

        transfer.setTransactionId(transaction.getId());
        transferRepository.save(transfer);

        transaction.setTransactionStatus(TransactionStatus.COMPLETED);
        transactionRepository.save(transaction);
        return "Transfer created successfully";
    }

    @PostMapping("/create/deposit")
    public String createDeposit(@Valid @RequestBody Deposit deposit) {
        Optional<Account> accountOptional = accountRepository.findByNumber(deposit.getAccountNumber());
        if (accountOptional.isEmpty()) {
            return "Invalid account number provided for deposit";
        }

        Account account = accountOptional.get();
        if (deposit.getAmount() <= 0) {
            return "amount: must be greater than 0";
        }

        Transaction transaction = new Transaction();
        transaction.setTransactionType(TransactionTypes.DEPOSIT);
        transaction.setAccountId(deposit.getAccountNumber());
        transaction.setTransactionStatus(TransactionStatus.PENDING);
        transaction.setAmount(deposit.getAmount());
        transaction.setDescription("Deposit to account " + deposit.getAccountNumber());

        transactionRepository.save(transaction);

        deposit.setTransactionId(transaction.getId());
        depositRepository.save(deposit);

        account.setBalance(account.getBalance() + deposit.getAmount());
        accountRepository.save(account);

        transaction.setTransactionStatus(TransactionStatus.COMPLETED);
        transactionRepository.save(transaction);

        return "Deposit created successfully";
    }

    @PostMapping("/create/withdrawal")
    public String createWithdrawal(@Valid @RequestBody Withdrawal withdrawal) {
        Optional<Account> accountOptional = accountRepository.findByNumber(withdrawal.getAccountNumber());
        if (accountOptional.isEmpty()) {
            return "Invalid account number provided for withdrawal";
        }

        Account account = accountOptional.get();
        if (withdrawal.getAmount() <= 0) {
            return "amount: must be greater than 0";
        }

        if (withdrawal.getAmount() > account.getBalance()) {
            return "Insufficient balance for withdrawal";
        }

        Transaction transaction = new Transaction();
        transaction.setTransactionType(TransactionTypes.WITHDRAWAL);
        transaction.setAccountId(withdrawal.getAccountNumber());
        transaction.setTransactionStatus(TransactionStatus.PENDING);
        transaction.setAmount(withdrawal.getAmount());
        transaction.setDescription("Withdrawal from account " + withdrawal.getAccountNumber());

        transactionRepository.save(transaction);

        withdrawal.setTransactionId(transaction.getId());
        withdrawalRepository.save(withdrawal);

        account.setBalance(account.getBalance() - withdrawal.getAmount());
        accountRepository.save(account);

        transaction.setTransactionStatus(TransactionStatus.COMPLETED);
        transactionRepository.save(transaction);

        return "Withdrawal created successfully";
    }

    @GetMapping("/get/{accountNumber}")
    public List<Transaction> getTransactionByAccountNumber(@PathVariable String accountNumber) {
        return transactionRepository.findByAccountId(accountNumber);
    }
}
