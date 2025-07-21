package pczstudent.pracainz.budgetmanagementapp.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
public class Deposit {
    private String transactionId;
    private String accountNumber;
    private double amount;
    private String description;

    public Deposit() {
        // Default constructor
    }

    public Deposit(String transactionId, String accountNumber, double amount, String description) {
        this.transactionId = transactionId;
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.description = description;
    }
}
