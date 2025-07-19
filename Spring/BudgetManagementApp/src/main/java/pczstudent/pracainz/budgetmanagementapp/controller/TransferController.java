package pczstudent.pracainz.budgetmanagementapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pczstudent.pracainz.budgetmanagementapp.model.Account;
import pczstudent.pracainz.budgetmanagementapp.model.Transfer;
import pczstudent.pracainz.budgetmanagementapp.repository.TransferRepository;


import java.util.List;

@RestController
@RequestMapping("/Transfer")
public class TransferController {

    @Autowired
    private TransferRepository transferRepository;

    @GetMapping("/all/{AccountId}")
    public List<Transfer> getAllTransfers(@RequestBody Account account) {
        return  transferRepository.findByFromAccountNumber(account.getNumber());
    }

    // Additional methods for handling transfers can be added here

}
