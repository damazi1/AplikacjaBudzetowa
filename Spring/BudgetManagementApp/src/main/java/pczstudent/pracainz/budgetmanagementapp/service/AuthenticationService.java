package pczstudent.pracainz.budgetmanagementapp.service;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pczstudent.pracainz.budgetmanagementapp.dto.AuthDto;
import pczstudent.pracainz.budgetmanagementapp.model.User;
import pczstudent.pracainz.budgetmanagementapp.model.UserRoles;
import pczstudent.pracainz.budgetmanagementapp.repository.UserRepository;

import java.util.Date;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public User signup(AuthDto authDto) {
        User user = new User()
                .setLogin(authDto.getUsername())
                .setPassword(passwordEncoder.encode(authDto.getPassword()))
                .setRole(UserRoles.USER);
        return userRepository.save(user);
    }
    public User authenticate(AuthDto authDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authDto.getUsername(),
                        authDto.getPassword()
                )
        );
        return userRepository.findByLogin(authDto.getUsername()).orElseThrow();
    }
}
