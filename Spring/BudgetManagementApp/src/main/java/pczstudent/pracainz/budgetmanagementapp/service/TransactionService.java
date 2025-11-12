package pczstudent.pracainz.budgetmanagementapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletExpensesAndIncome;
import pczstudent.pracainz.budgetmanagementapp.model.Transaction;
import pczstudent.pracainz.budgetmanagementapp.model.Wallet;
import pczstudent.pracainz.budgetmanagementapp.repository.TransactionRepository;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final WalletService walletService;

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

}
