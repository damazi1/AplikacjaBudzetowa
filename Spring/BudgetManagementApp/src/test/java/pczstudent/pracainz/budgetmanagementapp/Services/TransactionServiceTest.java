package pczstudent.pracainz.budgetmanagementapp.Services;

import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletNewTransactionDTO;
import pczstudent.pracainz.budgetmanagementapp.model.Transaction;
import pczstudent.pracainz.budgetmanagementapp.model.User;
import pczstudent.pracainz.budgetmanagementapp.model.Wallet;
import pczstudent.pracainz.budgetmanagementapp.repository.TransactionRepository;
import pczstudent.pracainz.budgetmanagementapp.repository.UserRepository;
import pczstudent.pracainz.budgetmanagementapp.repository.WalletRepository;
import pczstudent.pracainz.budgetmanagementapp.service.TransactionService;
import pczstudent.pracainz.budgetmanagementapp.service.WalletService;

import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private WalletRepository walletRepository;
    @Mock
    private WalletService walletService;

    @Mock
    private UserRepository userRepository; // Dodany mock

    @InjectMocks
    private TransactionService transactionService;

    private static Stream<Arguments> walletTransactionsProvider() {
        return Stream.of(
                Arguments.of(100.0, 50.0, 150.0, "Test_Category", "Test_Description"),
                Arguments.of(200.0, -20.0, 180.0, "Groceries", null),
                Arguments.of(0.0, 10.5, 10.5, "Salary", "June Salary")
        );
    }

    @ParameterizedTest
    @MethodSource("walletTransactionsProvider")
    void walletNewTransactionTestOK(
            double initialBalance,
            double amount,
            double expectedBalance,
            String category,
            String description
    ) {
        String walletId = "Test_Wallet_ID";
        String userId = "Test_User_ID";

        Wallet wallet = new Wallet();
        wallet.setId(walletId);
        wallet.setUserId(userId); // Ustawienie userId w portfelu
        wallet.setBalance(initialBalance);

        User user = new User();
        user.setId(userId);

        WalletNewTransactionDTO dto = new WalletNewTransactionDTO();
        dto.setWalletId(walletId);
        dto.setAmount(amount);
        dto.setCategory(category);
        dto.setDescription(description);

        when(walletRepository.findById(walletId)).thenReturn(Optional.of(wallet));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(transactionRepository.save(any(Transaction.class)))
                .thenAnswer(inv -> inv.getArgument(0, Transaction.class));

        // when
        Transaction result = transactionService.walletNewTransaction(dto);

        // then
        assertThat(wallet.getBalance()).isEqualTo(expectedBalance);
        verify(walletService).updateWallet(wallet);
        verify(transactionRepository).save(any(Transaction.class));
        assertThat(result.getWalletId()).isEqualTo(walletId);
        assertThat(result.getUserId()).isEqualTo(userId);
        assertThat(result.getAmount()).isEqualTo(amount);
        assertThat(result.getCategory()).isEqualTo(category);
        assertThat(result.getDescription()).isEqualTo(description);
    }

    @Test
    void walletNewTransactionTest_WalletNotFound() {
        // given
        String walletId = "Non_Existing_Wallet_ID";

        WalletNewTransactionDTO dto = new WalletNewTransactionDTO();
        dto.setWalletId(walletId);
        dto.setAmount(100.0);
        dto.setCategory("Test_Category");
        dto.setDescription("Test_Description");

        when(walletRepository.findById(walletId)).thenReturn(Optional.empty());

        // when & then
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> transactionService.walletNewTransaction(dto));

        assertThat(exception.getMessage()).isEqualTo("Nie znaleziono portfela");
        verify(transactionRepository, never()).save(any(Transaction.class));
    }

    @Test
    void walletNewTransactionTest_UserNotFound() {
        // given
        String walletId = "Test_Wallet_ID";
        String userId = "Non_Existing_User_ID";

        Wallet wallet = new Wallet();
        wallet.setId(walletId);
        wallet.setUserId(userId); // Ustawienie userId w portfelu
        wallet.setBalance(100.0);

        WalletNewTransactionDTO dto = new WalletNewTransactionDTO();
        dto.setWalletId(walletId);
        dto.setAmount(50.0);
        dto.setCategory("Test_Category");
        dto.setDescription("Test_Description");

        when(walletRepository.findById(walletId)).thenReturn(Optional.of(wallet));
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        // when & then
        UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class, () -> transactionService.walletNewTransaction(dto));
        assertThat(exception.getMessage()).isEqualTo("Nie znaleziono uzytkownika");
        verify(transactionRepository, never()).save(any(Transaction.class));
    }
}