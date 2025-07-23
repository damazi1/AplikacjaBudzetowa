package pczstudent.pracainz.budgetmanagementapp.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@Document
public class Transaction {
    @Id
    private String id;
    private String accountId;
    private String description;
    @CreatedDate
    private Date date; // Consider using LocalDate for better date handling
    private double amount;
    private TransactionTypes transactionType;
    private TransactionStatus transactionStatus;
    public Transaction() {
        // Default constructor
    }

    public Transaction(String id, String accountId, String description, double amount, Date date) {
        this.id = id;
        this.accountId = accountId;
        this.description = description;
        this.date = date;
    }


}
