package pczstudent.pracainz.budgetmanagementapp.controller;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.model.Account;
import pczstudent.pracainz.budgetmanagementapp.model.Transaction;
import pczstudent.pracainz.budgetmanagementapp.model.TransactionTypes;
import pczstudent.pracainz.budgetmanagementapp.model.Transfer;
import pczstudent.pracainz.budgetmanagementapp.repository.AccountRepository;
import pczstudent.pracainz.budgetmanagementapp.repository.TransactionRepository;
import pczstudent.pracainz.budgetmanagementapp.repository.TransferRepository;

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

    @PostMapping("/create/transfer")
    public String createTransfer(@Valid @RequestBody Transfer transfer) {
        if (accountRepository.findByNumber(transfer.getFromAccountNumber()).isEmpty() ||
            accountRepository.findByNumber(transfer.getToAccountNumber()).isEmpty()) {
            return "Invalid account numbers provided for transfer";
        }


        Transaction transaction = new Transaction();
        transaction.setTransactionType(TransactionTypes.TRANSFER);
        transaction.setAccountId(transfer.getFromAccountNumber());

        transaction.setDescription("Transfer to account " + transfer.getToAccountNumber());

        transactionRepository.save(transaction);

        Account from = accountRepository.findByNumber(transfer.getFromAccountNumber()).orElseThrow(() -> new RuntimeException("Account not found"));
        Account to = accountRepository.findByNumber(transfer.getToAccountNumber()).orElseThrow(() -> new RuntimeException("Account not found"));

        from.setBalance(from.getBalance() - transfer.getAmount());
        to.setBalance(to.getBalance() + transfer.getAmount());

        accountRepository.save(from);
        accountRepository.save(to);

        transfer.setTransactionId(transaction.getId());
        transferRepository.save(transfer);

        return "Transfer created successfully";
    }
}
