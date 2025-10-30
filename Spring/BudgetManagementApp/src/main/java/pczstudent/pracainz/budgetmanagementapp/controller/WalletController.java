package pczstudent.pracainz.budgetmanagementapp.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pczstudent.pracainz.budgetmanagementapp.model.Wallet;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletAdd;
import pczstudent.pracainz.budgetmanagementapp.service.WalletService;

@RequestMapping("/wallet")
@RestController
@AllArgsConstructor
public class WalletController {
    private final WalletService walletService;

    @PostMapping("/add")
    public ResponseEntity<Wallet> addWallet(@RequestBody WalletAdd wallet) {
        Wallet createdWallet = walletService.addWallet(wallet);
        return ResponseEntity.ok(createdWallet);
    }
}
