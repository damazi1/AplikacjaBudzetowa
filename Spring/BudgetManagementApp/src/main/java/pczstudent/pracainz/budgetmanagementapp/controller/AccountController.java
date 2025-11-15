package pczstudent.pracainz.budgetmanagementapp.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.dto.AccountAdd;
import pczstudent.pracainz.budgetmanagementapp.model.Account;
import pczstudent.pracainz.budgetmanagementapp.model.Currency;
import pczstudent.pracainz.budgetmanagementapp.repository.AccountRepository;
import pczstudent.pracainz.budgetmanagementapp.repository.UserRepository;
import pczstudent.pracainz.budgetmanagementapp.service.AccountService;
import pczstudent.pracainz.budgetmanagementapp.service.CommonService;

import java.util.List;

@RestController
@RequestMapping("/Account")
@AllArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/create")
    public ResponseEntity<Account> createAccount(@Valid @RequestBody AccountAdd account) {
        Account newAccount = accountService.createAccount(account);
        return ResponseEntity.ok(newAccount);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Account>> getAccountsById() {
        List<Account> account = accountService.getAccountByUserId();
        return ResponseEntity.ok(account);
    }

    @GetMapping("/details")
    public ResponseEntity<Account> getAccountDetails(@RequestParam String id) {
        Account account = accountService.getAccountDetails(id);
        return ResponseEntity.ok(account);
    }
}
