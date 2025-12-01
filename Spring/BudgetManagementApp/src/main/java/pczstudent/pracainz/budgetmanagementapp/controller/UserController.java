package pczstudent.pracainz.budgetmanagementapp.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.dto.UserDetails;
import pczstudent.pracainz.budgetmanagementapp.model.User;

import java.util.List;

import pczstudent.pracainz.budgetmanagementapp.service.UserService;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        User currentUser = userService.currentUser();
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        List <User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String query) {
        return userService.searchUsers(query);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody UserDetails user) {
        User updatedUser = userService.setUserDetails(user);
        return ResponseEntity.ok(updatedUser);
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse servletResponse) {
        userService.logout(servletResponse);
        return ResponseEntity.ok("Wylogowano pomyślnie");
    }
}
