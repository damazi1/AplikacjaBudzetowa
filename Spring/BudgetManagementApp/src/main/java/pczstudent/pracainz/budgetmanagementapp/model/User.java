package pczstudent.pracainz.budgetmanagementapp.model;

import com.mongodb.lang.Nullable;
import lombok.*;
import lombok.experimental.Accessors;
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
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    private String id;
    @Indexed(unique = true)
    private String login;
    private String password;
    private UserRoles role;
    private LocalDate createdAt;
    @Nullable
    private String firstName;
    @Nullable
    private String lastName;
    @Nullable
    private String email;
    @Nullable
    private String phoneNumber;
    @Nullable
    private String city;
    @Nullable
    private String street;
    @Nullable
    private String houseNumber;
    @Nullable
    private String postalCode;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return login;
    }
}