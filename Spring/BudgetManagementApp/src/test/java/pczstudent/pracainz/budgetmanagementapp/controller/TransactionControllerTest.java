package pczstudent.pracainz.budgetmanagementapp.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TransactionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void createTransferOK() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.post("/Transaction/create/transfer")
                        .contentType("application/json")
                        .content("{\"fromAccountNumber\":\"1234567890122234569012335\",\"toAccountNumber\":\"1234567890122234569012335\",\"amount\":50.0}"))
                .andExpect(status().isOk())
                .andExpect(content().string("Transfer created successfully")); // Uncomment if you have a specific response
    }

    @Test
    public void testCreateTransfer() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.post("/Transaction/create/transfer")
                        .contentType("application/json")
                        .content("{\"fromAccountNumber\":\"12345\",\"toAccountNumber\":\"67890\",\"amount\":100.0}"))
                .andExpect(status().isOk())
                .andExpect(content().string("Invalid account numbers provided for transfer")); // Uncomment if you have a specific response
    }
    @Test
    public void createTransferReturnsErrorForInvalidAccountNumbers() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.post("/Transaction/create/transfer")
                        .contentType("application/json")
                        .content("{\"fromAccountNumber\":\"invalid1\",\"toAccountNumber\":\"invalid2\",\"amount\":100.0}"))
                .andExpect(status().isOk())
                .andExpect(content().string("Invalid account numbers provided for transfer"));
    }

    @Test
    public void createTransferHandlesNegativeTransferAmount() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.post("/Transaction/create/transfer")
                        .contentType("application/json")
                        .content("{\"fromAccountNumber\":\"1234567890122234569012335\",\"toAccountNumber\":\"1234567890122234569012335\",\"amount\":-50.0}"))
                .andExpect(status().is4xxClientError())
                .andExpect(content().string("amount: must be greater than 0"));
    }

    @Test
    public void createTransferHandlesBorderTransferAmount() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.post("/Transaction/create/transfer")
                        .contentType("application/json")
                        .content("{\"fromAccountNumber\":\"1234567890122234569012335\",\"toAccountNumber\":\"1234567890122234569012335\",\"amount\":0.0}"))
                .andExpect(status().is4xxClientError())
                .andExpect(content().string("amount: must be greater than 0"));
    }


    @Test
    public void createTransferHandlesInsufficientBalance() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.post("/Transaction/create/transfer")
                        .contentType("application/json")
                        .content("{\"fromAccountNumber\":\"12345\",\"toAccountNumber\":\"67890\",\"amount\":1000000.0}"))
                .andExpect(status().is4xxClientError())
                .andExpect(content().string("amount: numeric value out of bounds (<4 digits>.<2 digits> expected)"));
    }

}