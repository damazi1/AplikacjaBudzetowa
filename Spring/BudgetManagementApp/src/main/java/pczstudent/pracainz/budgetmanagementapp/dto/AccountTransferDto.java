package pczstudent.pracainz.budgetmanagementapp.dto;

import lombok.Getter;

@Getter
public class AccountTransferDto {
    public String accountFromId;
    public String accountToNumber;
    public double amount;
    public String description;
}
