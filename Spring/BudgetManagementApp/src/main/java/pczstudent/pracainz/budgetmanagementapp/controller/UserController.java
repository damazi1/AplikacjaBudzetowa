package pczstudent.pracainz.budgetmanagementapp.controller;


import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.config.JwtUtil;
import pczstudent.pracainz.budgetmanagementapp.model.User;
import pczstudent.pracainz.budgetmanagementapp.repository.UserRepository;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.List;
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
    public ResponseEntity<?> login(@RequestBody User user, jakarta.servlet.http.HttpServletResponse servletResponse) {
        Optional<User> userOpt = userRepository.findByLogin(user.getLogin());
        Map<String, String> response = new HashMap<>();
        if (userOpt.isPresent() && passwordEncoder.matches(user.getPassword(), userOpt.get().getPassword())) {
            try {
                String token = JwtUtil.generateToken(userOpt.get().getLogin());

                Cookie tokenCookie = new Cookie("jwt", token);
                tokenCookie.setHttpOnly(true);
                tokenCookie.setPath("/");
                tokenCookie.setMaxAge(60 * 60 * 24); // Token ważny przez 1 dzień
                tokenCookie.setSecure(false);
                servletResponse.addCookie(tokenCookie);
            } catch (Exception e) {
                response.put("error", "Błąd podczas generowania tokena: " + e.getMessage());
            }
        } else {
            response.put("error", "Błędny login lub hasło");
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@CookieValue(value = "jwt", required = true) String token) {
        System.out.println("Odebrany token JWT: " + token); // Wyświetli token w konsoli
        if (token == null) {
            return ResponseEntity.status(401).body("Brak tokena");
        }
        try {
            String login = JwtUtil.validateTokenAndGetLogin(token);
            Optional<User> userOpt = userRepository.findByLogin(login);
            if (userOpt.isPresent()) {
                return ResponseEntity.ok(userOpt.get());
            } else {
                return ResponseEntity.status(404).body("Użytkownik nie znaleziony");
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Nieprawidłowy token");
        }
    }
    @GetMapping("/list")
    public Iterable<User> getUser() {
        return userRepository.findAll();
    }
    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String query) {
        return userRepository.findByLoginContainingIgnoreCase(query);
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
