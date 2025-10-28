package pczstudent.pracainz.budgetmanagementapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Setter
@Getter
@Data
@Document
@Accessors(chain = true)
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    private String id;
    @Indexed(unique = true)
    private String login;
    private String password;
    private UserRoles role;
    private LocalDate createdAt;

    public User(String username, String password) {
        this.login = username;
        this.password = password;
        this.role = UserRoles.USER;
        this.createdAt = LocalDate.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return login;
    }
}