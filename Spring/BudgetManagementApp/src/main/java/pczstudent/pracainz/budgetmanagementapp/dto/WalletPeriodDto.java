package pczstudent.pracainz.budgetmanagementapp.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.util.Date;

@Getter
public class WalletPeriodDto {
    private String walletId;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date from;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date to;
}
