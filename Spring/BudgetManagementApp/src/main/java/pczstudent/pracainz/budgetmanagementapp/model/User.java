package pczstudent.pracainz.budgetmanagementapp.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document
public class User {

    @Id
    private String id;

    private String username;

    public User() {}
    public User(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return String.format(
                "user[id=%s, username='%s']",
                id, username);}

}
