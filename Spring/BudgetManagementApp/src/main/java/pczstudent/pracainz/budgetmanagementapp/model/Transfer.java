package pczstudent.pracainz.budgetmanagementapp.model;


import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
@Getter
@Setter
@Document
public class Transfer {
    private String TransactionId;
    private String fromAccountNumber;
    private String toAccountNumber;
    @Positive
    @Digits(integer = 4, fraction = 2)
    private double amount;
    private String description;

}
