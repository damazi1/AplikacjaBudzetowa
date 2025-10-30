package pczstudent.pracainz.budgetmanagementapp.dto;

import lombok.Getter;
import pczstudent.pracainz.budgetmanagementapp.model.Currency;

@Getter
public class WalletAdd {
    private String name;
    private Currency currency;
}
