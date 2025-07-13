package pczstudent.pracainz.budgetmanagementapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.model.User;
import pczstudent.pracainz.budgetmanagementapp.repository.UserRepository;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/addUser")
    public void addUser(@RequestParam String username) {
        userRepository.insert(new User(username));
    }

    @GetMapping("/list")
    public Iterable<User> getUser() {
        return userRepository.findAll();
    }
    @GetMapping("/details/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        return userRepository.findById(id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
    }
    @PutMapping("/update/{id}")
    public void updateUser(@PathVariable String id, @RequestParam String username) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(username);
        userRepository.save(user);
    }
}
