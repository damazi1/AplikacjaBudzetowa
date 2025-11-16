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

import java.util.Date;
import java.util.List;
@RestController
@RequestMapping("/Transaction")
@AllArgsConstructor
public class TransactionController {

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

    @PostMapping("/account/newTransfer")
    public ResponseEntity<Transaction> newTransfer(@Valid @RequestBody Transaction transaction) {
        try {
            Transaction newTransaction = transactionService.accountNewTransfer(transaction);
            return ResponseEntity.ok(newTransaction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/account/newTransaction")
    public ResponseEntity<Transaction> newTransaction(@Valid @RequestBody Transaction transaction) {
       Transaction newTransaction = transactionService.accountNewTransaction(transaction);
         return ResponseEntity.ok(newTransaction);
    }


    @GetMapping("/account/transactions")
    public ResponseEntity<List<Transaction>> getTransactionByAccountNumber(@RequestParam String id) {
        List<Transaction> transactions = transactionService.allAccountTransactions(id);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/all")
    public ResponseEntity<Double> getAllTransactions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        Double total = transactionService.allUserTransactionsSum(currentUser.getId());
        return ResponseEntity.ok(total);
    }
}
