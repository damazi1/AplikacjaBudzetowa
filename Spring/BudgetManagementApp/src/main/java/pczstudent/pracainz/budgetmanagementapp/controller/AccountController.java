package pczstudent.pracainz.budgetmanagementapp.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.model.Account;
import pczstudent.pracainz.budgetmanagementapp.repository.AccountRepository;
import pczstudent.pracainz.budgetmanagementapp.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/Account")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public String createAccount(@Valid @RequestBody Account account) {
        if(userRepository.findById(account.getUserId()).isEmpty()){
            return "User not found";
        }
        accountRepository.insert(account);
        return "Account created successfully";
    }
    @GetMapping("/get/{userId}")
    public List<Account> getAccountsByUserId(@PathVariable String userId) {
        return accountRepository.findByUserId(userId);
    }
    @GetMapping("/details/{number}")
    public Account getAccountDetails(@PathVariable String number) {
        return accountRepository.findByNumber(number).orElse(null);
    }
}
