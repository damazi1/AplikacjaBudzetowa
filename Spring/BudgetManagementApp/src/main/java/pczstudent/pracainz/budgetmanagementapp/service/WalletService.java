package pczstudent.pracainz.budgetmanagementapp.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletAdd;
import pczstudent.pracainz.budgetmanagementapp.model.Wallet;
import pczstudent.pracainz.budgetmanagementapp.repository.WalletRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
@AllArgsConstructor
public class WalletService {
    private final WalletRepository walletRepository;

    public Wallet addWallet(WalletAdd wallet){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        Wallet newWallet = new Wallet ()
                .setName(wallet.getName())
                .setCurrency(wallet.getCurrency())
                .setUserId(currentUser)
                .setBalance(wallet.getBalance() != null ? wallet.getBalance(): BigDecimal.ZERO);
        return walletRepository.save(newWallet);
    }

    public List<Wallet> getWalletsForUser(String login) {
        return walletRepository.findByUserId(login);
    }
}
