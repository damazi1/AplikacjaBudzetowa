package pczstudent.pracainz.budgetmanagementapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@EnableMongoAuditing
@SpringBootApplication
@RestController
public class BudgetManagementAppApplication {
    public static void main(String[] args)
    {
        SpringApplication.run(BudgetManagementAppApplication.class, args);
    }
}
