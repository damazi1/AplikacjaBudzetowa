package pczstudent.pracainz.budgetmanagementapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@CrossOrigin
public class BudgetManagementAppApplication {

    public static void main(String[] args)
    {
        SpringApplication.run(BudgetManagementAppApplication.class, args);
    }


}
