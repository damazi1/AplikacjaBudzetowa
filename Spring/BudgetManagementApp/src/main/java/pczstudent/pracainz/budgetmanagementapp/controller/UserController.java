package pczstudent.pracainz.budgetmanagementapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.config.JwtUtil;
import pczstudent.pracainz.budgetmanagementapp.model.User;
import pczstudent.pracainz.budgetmanagementapp.repository.UserRepository;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
@RestController
@RequestMapping("/User")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Rejestracja użytkownika.
     * @param user Obiekt użytkownika zawierający dane do rejestracji w formacie JSON.
     *             Wymagane pola: login, password, role.
     */
    @PostMapping("/register")
    public String register(@Valid @RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.insert(user);
        return "Rejestracja udana";
    }

    /**
     * Logowanie użytkownika.
     * @param user Obiekt użytkownika zawierający login i hasło w formacie JSON.
     * @return Map zawierająca token JWT i rolę użytkownika lub komunikat o błędzie.
     */
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        Optional<User> userOpt = userRepository.findByLogin(user.getLogin());
        Map<String, String> response = new HashMap<>();
        if (userOpt.isPresent() && passwordEncoder.matches(user.getPassword(), userOpt.get().getPassword())) {
            try {
                response.put("token", JwtUtil.generateToken(userOpt.get().getLogin()));
                response.put("role", userOpt.get().getRole().name());
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
    @GetMapping("/getId/{login}")
    public String getUserIdByLogin(@PathVariable String login) {
        return userRepository.findByLogin(login)
                .map(User::getId)
                .orElseThrow(() -> new RuntimeException("User not found"));
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
