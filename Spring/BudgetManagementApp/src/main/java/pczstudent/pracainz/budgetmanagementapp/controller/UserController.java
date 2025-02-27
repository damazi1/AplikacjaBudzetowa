package pczstudent.pracainz.budgetmanagementapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.model.User;
import pczstudent.pracainz.budgetmanagementapp.repository.UserRepository;

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
}
