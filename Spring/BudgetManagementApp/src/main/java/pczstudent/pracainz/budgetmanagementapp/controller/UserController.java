package pczstudent.pracainz.budgetmanagementapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.config.JwtUtil;
import pczstudent.pracainz.budgetmanagementapp.model.LoginRequest;
import pczstudent.pracainz.budgetmanagementapp.model.User;
import pczstudent.pracainz.budgetmanagementapp.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestParam String login, @RequestParam String password, @RequestParam String role) {
        if (userRepository.findByLogin(login).isPresent()) {
            return "Użytkownik o takim loginie już istnieje";
        }
        String hashedPassword = passwordEncoder.encode(password);
        userRepository.insert(new User(login, hashedPassword, role));
        return "Rejestracja udana";
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByLogin(loginRequest.getLogin());
        Map<String, String> response = new HashMap<>();
        if (userOpt.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), userOpt.get().getPassword())) {
            try {
                response.put("token", JwtUtil.generateToken(userOpt.get().getLogin()));
                response.put("role", userOpt.get().getRole());
            } catch (Exception e) {
                response.put("error", "Błąd podczas generowania tokena: " + e.getMessage());
            }
        } else {
            response.put("error", "Błędny login lub hasło");
        }
        return response;
    }

    @GetMapping("/list")
    public Iterable<User> getUser() {
        return userRepository.findAll();
    }
    @GetMapping("/details/{login}")
    public Optional<User> getUserByLogin(@PathVariable String login) {
        return userRepository.findByLogin(login);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
    }
    @PutMapping("/update/{id}")
    public void updateUser(@PathVariable String id, @RequestParam String login) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setLogin(login);
        userRepository.save(user);
    }
}
