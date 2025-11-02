package pczstudent.pracainz.budgetmanagementapp.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import lombok.Getter;
import pczstudent.pracainz.budgetmanagementapp.model.Currency;

import java.math.BigDecimal;

@Getter
public class WalletAdd {
    private String name;
    private Currency currency;
    @DecimalMin(value = "0.00", inclusive = true, message = "Balance cannot be negative")
    @Digits(integer = 20, fraction = 2, message = "Maximum 2 decimal places allowed")
    private BigDecimal balance;
}
