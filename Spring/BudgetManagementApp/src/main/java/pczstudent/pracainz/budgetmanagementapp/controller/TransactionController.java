package pczstudent.pracainz.budgetmanagementapp.controller;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.model.*;
import pczstudent.pracainz.budgetmanagementapp.repository.*;

import java.util.Optional;
@RestController
@RequestMapping("/Transaction")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransferRepository transferRepository;

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private DepositRepository depositRepository;
    @Autowired
    private WithdrawalRepository withdrawalRepository;

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
}
