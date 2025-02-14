package pczstudent.pracainz.budgetmanagementapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    public String toString(){
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
