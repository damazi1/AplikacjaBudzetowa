package pczstudent.pracainz.budgetmanagementapp.controller;


import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.model.User;

import java.util.List;
import java.util.Optional;

import pczstudent.pracainz.budgetmanagementapp.service.UserService;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

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
//    @GetMapping("/getId/{login}")
//    public String getUserIdByLogin(@PathVariable String login) {
//        return userRepository.findByLogin(login)
//                .map(User::getId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//    }
//    @GetMapping("/details/{login}")
//    public Optional<User> getUserByLogin(@PathVariable String login) {
//        return userRepository.findByLogin(login);
//    }
//    @DeleteMapping("/delete/{id}")
//    public void deleteUser(@PathVariable String id) {
//        userRepository.deleteById(id);
//    }
//    @PutMapping("/update/{id}")
//    public void updateUser(@PathVariable String id, @RequestParam String login) {
//        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
//        user.setLogin(login);
//        userRepository.save(user);
//    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(jakarta.servlet.http.HttpServletResponse servletResponse) {
        Cookie tokenCookie = new Cookie("jwt", null);
        tokenCookie.setHttpOnly(true);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge(0); // Usuń ciasteczko
        tokenCookie.setSecure(false);
        servletResponse.addCookie(tokenCookie);
        return ResponseEntity.ok("Wylogowano pomyślnie");
    }

}
