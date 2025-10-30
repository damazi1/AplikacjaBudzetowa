package pczstudent.pracainz.budgetmanagementapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@AllArgsConstructor
public enum Currency {
    USD("United States Dollar", 1.0),
    EUR("Euro",1.1),
    GBP("British Pound Sterling",1.25),
    JPY("Japanese Yen",0.0075),
    AUD("Australian Dollar",0.7),
    CAD("Canadian Dollar",0.75),
    CHF("Swiss Franc",1.05),
    CNY("Chinese Yuan Renminbi", 0.14),
    SEK("Swedish Krona", 0.11),
    NZD("New Zealand Dollar", 0.65),
    PLN("Polish Zloty", 0.22);

    private final String fullName;
    private final double toUSDExchangeRate;
}
