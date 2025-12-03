package pczstudent.pracainz.budgetmanagementapp.controller;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.dto.*;
import pczstudent.pracainz.budgetmanagementapp.model.*;
import pczstudent.pracainz.budgetmanagementapp.service.TransactionService;

import java.util.Date;
import java.util.List;
@RestController
@RequestMapping("/Transaction")
@AllArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/wallet/newTransaction")
    public ResponseEntity<Transaction> newTransaction(@Valid @RequestBody WalletNewTransactionDTO transaction, @RequestParam String walletId) {
        transaction.setWalletId(walletId);
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

    @PostMapping("/wallet/pieChartData")
    public ResponseEntity<List<WalletPieChartDto>> getPieChartData (@RequestBody PeriodChangeDto periodData, @RequestParam String operator) {
        List<WalletPieChartDto> wallets = transactionService.getPieChartData(periodData, operator);
        return ResponseEntity.ok(wallets);
    }

    @PostMapping("/wallet/barChartData")
    public ResponseEntity<List<WalletBarChartDto>> getBarChartData (@RequestBody PeriodChangeDto periodData) {
        List<WalletBarChartDto> barData = transactionService.getBarChartData(periodData);
        return ResponseEntity.ok(barData);
    }

    @PostMapping("/wallet/lineChartData")
    public ResponseEntity<List<WalletLineChartDto>> getLineChartData (@RequestBody PeriodChangeDto periodData) {
        List<WalletLineChartDto> lineData = transactionService.getLineChartData(periodData);
        return ResponseEntity.ok(lineData);
    }
    @DeleteMapping("/wallet/deleteTransaction")
    public ResponseEntity<Transaction> deleteTransaction(@RequestParam String id) {
        Transaction deletedTransaction = transactionService.deleteWalletTransaction(id);
        return ResponseEntity.ok(deletedTransaction);
    }

    @PutMapping("/wallet/updateTransaction")
    public ResponseEntity<Transaction> updateTransaction(@Valid @RequestBody Transaction transaction) {
        Transaction updatedTransaction = transactionService.updateWalletTransaction(transaction);
        return ResponseEntity.ok(updatedTransaction);
    }

    @PostMapping("/account/newTransfer")
    public ResponseEntity<Transaction> newTransfer(@RequestBody AccountTransferDto accountTransfer) {
        try {
            Transaction newTransaction = transactionService.accountNewTransfer(accountTransfer);
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
    public ResponseEntity<List<AccountTransactionsDto>> getTransactionByAccountNumber(@RequestParam String id) {
        List<AccountTransactionsDto> transactions = transactionService.allAccountTransactions(id);
        return ResponseEntity.ok(transactions);
    }

    @PostMapping("/account/barChartData")
    public ResponseEntity<List<WalletBarChartDto>> getAccountBarChartData (@RequestBody PeriodChangeDto periodData){
        List<WalletBarChartDto> barData = transactionService.getBarChartAccountData(periodData);
        return ResponseEntity.ok(barData);
    }
    @PostMapping("/account/lineChartData")
    public ResponseEntity<List<WalletLineChartDto>> getAccountLineChartData (@RequestBody PeriodChangeDto periodData) {
        List<WalletLineChartDto> lineData = transactionService.getLineChartAccountData(periodData);
        return ResponseEntity.ok(lineData);
    }

    @GetMapping("/all")
    public ResponseEntity<Double> getAllTransactions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        Double total = transactionService.allUserTransactionsSum(currentUser.getId());
        return ResponseEntity.ok(total);
    }

    @PostMapping("/all/barChartData")
    public ResponseEntity<List<WalletBarChartDto>> getAllBarChartData (@RequestBody PeriodChangeNoIdDto periodChangeNoIdDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        PeriodChangeDto periodData = new PeriodChangeDto(currentUser.getId(), periodChangeNoIdDto.from, periodChangeNoIdDto.to);
        List<WalletBarChartDto> barData = transactionService.getAllToBarChart(periodData);
        return ResponseEntity.ok(barData);
    }
    @PostMapping("/all/lineChartData")
    public ResponseEntity<List<WalletLineChartDto>> getAllLineChartData (@RequestBody PeriodChangeNoIdDto periodChangeNoIdDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        PeriodChangeDto periodData = new PeriodChangeDto(currentUser.getId(), periodChangeNoIdDto.from, periodChangeNoIdDto.to);
        List<WalletLineChartDto> lineData = transactionService.getAllToLineChart(periodData);
        return ResponseEntity.ok(lineData);
    }
}
