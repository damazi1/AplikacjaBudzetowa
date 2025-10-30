package pczstudent.pracainz.budgetmanagementapp.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
}
