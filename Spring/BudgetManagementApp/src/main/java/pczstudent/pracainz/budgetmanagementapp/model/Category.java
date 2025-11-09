package pczstudent.pracainz.budgetmanagementapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document
@AllArgsConstructor
@Getter
@Setter
public class Category {
    @Id
    private String id;
    private String icon;
    private String label;
    private String color;
}
