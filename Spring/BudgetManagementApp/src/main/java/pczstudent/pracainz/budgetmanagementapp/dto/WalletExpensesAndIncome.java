package pczstudent.pracainz.budgetmanagementapp.dto;

import lombok.Setter;
import lombok.experimental.Accessors;

@Setter
@Accessors(chain = true)
public class WalletExpensesAndIncome {
    public double totalExpenses;
    public double totalIncome;
    public double balanceChange;
}
