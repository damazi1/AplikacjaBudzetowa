package pczstudent.pracainz.budgetmanagementapp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.util.Date;

@Getter
public class WalletBarChartDto {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "UTC")
    public Date date;
    public double income;
    public double expenses;
}
