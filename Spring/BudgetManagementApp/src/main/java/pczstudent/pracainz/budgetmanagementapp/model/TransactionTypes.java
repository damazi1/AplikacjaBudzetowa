package pczstudent.pracainz.budgetmanagementapp.model;

import lombok.Getter;

@Getter
public enum TransactionTypes {
    TRANSFER("Transfer"),
    DEPOSIT("Deposit"),
    WITHDRAWAL("Withdrawal"),
    PAYMENT("Payment"),
    PURCHASE("Purchase"),
    REFUND("Refund"),
    FEE("Fee"),
    INTEREST("Interest"),
    DIVIDEND("Dividend"),
    LOAN_PAYMENT("Loan Payment"),
    INVESTMENT("Investment"),
    SALARY("Salary");

    private final String fullName;
    TransactionTypes(String fullName) {
        this.fullName = fullName;
    }
}
