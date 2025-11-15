package pczstudent.pracainz.budgetmanagementapp.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pczstudent.pracainz.budgetmanagementapp.model.Currency;
import pczstudent.pracainz.budgetmanagementapp.service.CommonService;

import java.util.List;

@RestController
@RequestMapping("/common")
@AllArgsConstructor
public class CommonController {

    private final CommonService commonService;

    @GetMapping("/currency")
    public ResponseEntity<List<Currency>> getCurrencies() {
        return ResponseEntity.ok(commonService.getAllCurrencies());
    }
}
