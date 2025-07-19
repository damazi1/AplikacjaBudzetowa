package pczstudent.pracainz.budgetmanagementapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Data
@Document
public class User {
    @Id
    private String id;
    @Indexed(unique = true)
    private String login;
    private String password;
    private UserRoles role;

    public User() {}

    public User(String username, String password, UserRoles role) {
        this.login = username;
        this.password = password;
        this.role = role;
    }

}