package pczstudent.pracainz.budgetmanagementapp.service;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import pczstudent.pracainz.budgetmanagementapp.dto.AccountAdd;
import pczstudent.pracainz.budgetmanagementapp.model.Account;
import pczstudent.pracainz.budgetmanagementapp.model.User;
import pczstudent.pracainz.budgetmanagementapp.repository.AccountRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

    public Account createAccount(@Valid AccountAdd accountAdd){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        User user = (User) authentication.getPrincipal();

        StringBuilder accountNumber = new StringBuilder();

        for (int i=0; i<25; i++) {
            accountNumber.append(String.valueOf((int) (Math.random() * 10)));
        }

        Account newAccount = new Account()
                .setName(accountAdd.getName())
                .setType(accountAdd.getType())
                .setUserId(user.getId())
                .setNumber(accountNumber.toString())
                .setBalance(0);
        return accountRepository.save(newAccount);
    }

    public List<Account> getAccountByUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return accountRepository.findByUserId(currentUser.getId());
    }

    public Account getAccountDetails(String id) {
        return accountRepository.findById(id).orElse(null);
    }

    public void updateAccount(Account account) {
        accountRepository.save(account);
    }
}
