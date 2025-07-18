package pczstudent.pracainz.budgetmanagementapp.model;

public enum AccountTypes {
    CHECKING("Checking Account"),
    SAVINGS("Savings Account"),
    CREDIT("Credit Card"),
    INVESTMENT("Investment Account"),
    LOAN("Loan Account");

    private final String fullName;

    AccountTypes(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }
}
