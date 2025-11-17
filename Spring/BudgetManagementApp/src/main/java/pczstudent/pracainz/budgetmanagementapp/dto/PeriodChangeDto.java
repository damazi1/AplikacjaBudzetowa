package pczstudent.pracainz.budgetmanagementapp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
public class PeriodChangeDto {
    public String id;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date from;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date to;
}
