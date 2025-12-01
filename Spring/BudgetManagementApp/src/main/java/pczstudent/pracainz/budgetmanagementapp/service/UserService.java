package pczstudent.pracainz.budgetmanagementapp.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pczstudent.pracainz.budgetmanagementapp.dto.UserDetails;
import pczstudent.pracainz.budgetmanagementapp.model.User;
import pczstudent.pracainz.budgetmanagementapp.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public User currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    public List<User> searchUsers(String query) {
        return userRepository.findByLoginContainingIgnoreCase(query);
    }

    public void logout(HttpServletResponse response) {
        Cookie tokenCookie = new Cookie("jwt", null);
        tokenCookie.setHttpOnly(true);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge(0); // Usuń ciasteczko
        tokenCookie.setSecure(false);
        response.addCookie(tokenCookie);
    }

    public User setUserDetails(UserDetails userDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        currentUser.setFirstName(userDetails.getFirstName());
        currentUser.setLastName(userDetails.getLastName());
        currentUser.setEmail(userDetails.getEmail());
        currentUser.setPhoneNumber(String.valueOf(userDetails.getPhoneNumber()));
        currentUser.setCity(userDetails.city);
        currentUser.setStreet(userDetails.street);
        currentUser.setHouseNumber(userDetails.houseNumber);
        currentUser.setPostalCode(userDetails.postalCode);

        return userRepository.save(currentUser);
    }
}
