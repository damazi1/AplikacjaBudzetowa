package pczstudent.pracainz.budgetmanagementapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
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
    public List<User> searchUsers(String query) {
        return userRepository.findByLoginContainingIgnoreCase(query);
    }
}
