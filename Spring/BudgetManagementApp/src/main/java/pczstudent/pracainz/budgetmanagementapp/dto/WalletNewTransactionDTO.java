package pczstudent.pracainz.budgetmanagementapp.dto;

import com.mongodb.lang.Nullable;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WalletNewTransactionDTO {
    @NotBlank(message = "Category is required")
    String category;
    @NotNull(message = "Amount is required")
    Double amount;
    @Nullable
    String description;
    @Nullable
    String walletId;

    @AssertTrue(message = "Amount must not be zero")
    public boolean isAmountNotZero() {
        return amount != null && amount != 0.0;
    }
}
