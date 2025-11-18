package pczstudent.pracainz.budgetmanagementapp.model;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Getter
@Setter
@Document
@Accessors(chain = true)
public class Account implements PaymentAcc {
    @Id
    private String id;
    private String name;
    @Size(min = 25, max = 25)
    @Indexed(unique = true)
    private String number;
    private Currency currency;
    private String userId;
    @Digits(integer = 12, fraction = 2)
    private double balance;
    private AccountTypes type;
    @CreatedDate
    private Date createdAt;

}
