package pczstudent.pracainz.budgetmanagementapp.dto;

import lombok.Getter;
import pczstudent.pracainz.budgetmanagementapp.model.Currency;

import java.util.Date;

@Getter
public class AccountTransactionsDto {
    public double amount;
    public String description;
    public Date date;
    public Currency currency;
}
