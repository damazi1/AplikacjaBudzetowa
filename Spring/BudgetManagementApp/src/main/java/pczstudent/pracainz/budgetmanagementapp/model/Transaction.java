package pczstudent.pracainz.budgetmanagementapp.model;

import com.mongodb.lang.Nullable;
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
    private String userId;
    @Nullable
    private String userToId;
    @Nullable
    private String description;
    @CreatedDate
    private Date date;
    @Nullable
    private String category;
    private double amount;
    @Nullable
    private String walletId;
    @Nullable
    private String accountId;
    @Nullable
    private TransactionTypes transactionType;
    @Nullable
    private TransactionStatus transactionStatus;
    public Transaction() {
        // Default constructor
    }

    public Transaction(String id, @Nullable String accountId, @Nullable String description, Date date) {
        this.id = id;
        this.accountId = accountId;
        this.description = description;
        this.date = date;
    }


}
