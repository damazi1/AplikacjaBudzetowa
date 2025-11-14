package pczstudent.pracainz.budgetmanagementapp.dto;


import jakarta.validation.constraints.Size;
import lombok.Getter;
import org.springframework.data.mongodb.core.index.Indexed;
import pczstudent.pracainz.budgetmanagementapp.model.AccountTypes;
import pczstudent.pracainz.budgetmanagementapp.model.Currency;

@Getter
public class AccountAdd {
    public String name;
    @Indexed(unique = true)
    @Size(min = 25,max = 25)
    public String number;
    public AccountTypes type;
    public Currency currency;
}
