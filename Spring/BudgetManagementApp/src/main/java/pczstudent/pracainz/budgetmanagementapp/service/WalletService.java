package pczstudent.pracainz.budgetmanagementapp.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletAdd;
import pczstudent.pracainz.budgetmanagementapp.model.User;
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
        User user = (User) authentication.getPrincipal();

        Wallet newWallet = new Wallet ()
                .setName(wallet.getName())
                .setCurrency(wallet.getCurrency())
                .setUserId(user.getId())
                .setBalance(wallet.getBalance() != 0 ? wallet.getBalance(): 0);
        return walletRepository.save(newWallet);
    }

    public List<Wallet> getWalletsForUser(String login) {
        return walletRepository.findByUserId(login);
    }
    public Wallet getWalletById(String id) {
        return walletRepository.findById(id).orElseThrow();
    }
    public Wallet updateWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }
    public List<Wallet> getWalletByUserId(String id) {
        return walletRepository.findByUserId(id);
    }
}
