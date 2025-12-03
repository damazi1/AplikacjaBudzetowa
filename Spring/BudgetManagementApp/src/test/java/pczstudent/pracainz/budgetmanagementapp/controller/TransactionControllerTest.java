package pczstudent.pracainz.budgetmanagementapp.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import pczstudent.pracainz.budgetmanagementapp.model.Transaction;
import pczstudent.pracainz.budgetmanagementapp.service.TransactionService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TransactionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TransactionService transactionService;
    @ParameterizedTest
    @ValueSource(strings = {
            "{\"category\": null, \"amount\": 100.0, \"description\": \"Test transaction\"}",
            "{\"category\": \"Groceries\", \"amount\": \"\", \"description\": null}",
            "{\"category\": \"Groceries\", \"amount\": \"0\", \"description\": null}",
            "{\"category\": \"Groceries\", \"amount\": null, \"description\": null}"
    })
    @WithMockUser
    public void createTransactionNoCat(String content) throws Exception{
        this.mockMvc.perform(MockMvcRequestBuilders.post("/Transaction/wallet/newTransaction")
                        .contentType("application/json")
                        .content(content)
                        .param("walletId", "wallet123"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    public void createTransactionOK1() throws Exception {
        Transaction transaction = new Transaction();
        when(transactionService.walletNewTransaction(any()))
                .thenReturn(transaction);

        this.mockMvc.perform(MockMvcRequestBuilders.post("/Transaction/wallet/newTransaction")
                        .contentType("application/json")
                        .content("{\"category\": \"Groceries\", \"amount\": 150.0, \"description\": \"Weekly shopping\"}")
                        .param("walletId", "wallet123"))
                .andExpect(status().isOk());
    }
}