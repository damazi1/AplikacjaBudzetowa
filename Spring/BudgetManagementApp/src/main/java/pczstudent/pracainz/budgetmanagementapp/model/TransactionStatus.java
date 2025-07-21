package pczstudent.pracainz.budgetmanagementapp.model;

import lombok.Getter;

@Getter
public enum TransactionStatus {
    PENDING("Pending"),
    COMPLETED("Completed"),
    FAILED("Failed");

    private final String fullName;

    TransactionStatus(String fullName) {
        this.fullName = fullName;
    }

}
