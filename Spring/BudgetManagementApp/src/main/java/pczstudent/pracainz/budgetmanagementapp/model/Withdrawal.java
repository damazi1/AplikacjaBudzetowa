package pczstudent.pracainz.budgetmanagementapp.model;

import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
public class Withdrawal {
    private String transactionId;
    private String accountNumber;
    @Positive
    private double amount;
    private String description;

    public Withdrawal() {
        // Default constructor
    }

    public Withdrawal(String transactionId, String accountNumber, double amount, String description) {
        this.transactionId = transactionId;
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.description = description;
    }
}
