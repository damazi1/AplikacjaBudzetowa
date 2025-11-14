package pczstudent.pracainz.budgetmanagementapp.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse servletResponse) {
        userService.logout(servletResponse);
        return ResponseEntity.ok("Wylogowano pomyślnie");
    }
}
