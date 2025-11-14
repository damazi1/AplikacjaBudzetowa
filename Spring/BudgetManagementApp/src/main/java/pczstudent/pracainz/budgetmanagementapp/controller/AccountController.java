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

import java.util.List;

@RestController
@RequestMapping("/Account")
@AllArgsConstructor
public class AccountController {

    private AccountRepository accountRepository;

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
    //TODO: Kontynuuj Wykorzystanie serwisów w backendzie
    //  Zostało jeszcze w Transaction i tutaj w accounts
    @GetMapping("/details/{number}")
    public Account getAccountDetails(@PathVariable String number) {
        return accountRepository.findByNumber(number).orElse(null);
    }
    @GetMapping("/currency")
    public List<Currency> getCurrencies() {
        List<Currency> currencies = List.of(Currency.values());
        return currencies;
    }
}
