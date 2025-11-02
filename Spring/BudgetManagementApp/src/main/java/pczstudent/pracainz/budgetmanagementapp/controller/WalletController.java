package pczstudent.pracainz.budgetmanagementapp.controller;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.model.Wallet;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletAdd;
import pczstudent.pracainz.budgetmanagementapp.service.WalletService;

@RequestMapping("/wallet")
@RestController
@AllArgsConstructor
public class WalletController {
    private final WalletService walletService;

    @PostMapping("/add")
    public ResponseEntity<Wallet> addWallet(@Valid @RequestBody WalletAdd wallet) {
        Wallet createdWallet = walletService.addWallet(wallet);
        return ResponseEntity.ok(createdWallet);
    }
    @GetMapping("/")
    public ResponseEntity<?> getWalletsForUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String login = authentication.getName();
        return ResponseEntity.ok(walletService.getWalletsForUser(login));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Wallet> getWalletById(@PathVariable String id) {
        Wallet wallet = walletService.getWalletById(id);
        return ResponseEntity.ok(wallet);
    }
}
