package pczstudent.pracainz.budgetmanagementapp.model;


import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class Wallet {
    @Id
    private String id;
    private String name;
    private String userId;
    private Currency currency;
@Digits(integer = 20, fraction = 2)
    private double balance;
}
