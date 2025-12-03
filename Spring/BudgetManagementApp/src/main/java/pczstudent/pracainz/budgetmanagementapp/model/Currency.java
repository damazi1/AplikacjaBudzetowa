package pczstudent.pracainz.budgetmanagementapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Currency {
    USD("United States Dollar", 1.0, 1.0),
    EUR("Euro",1.1, 0.91),
    GBP("British Pound Sterling",1.25, 0.8),
    JPY("Japanese Yen",0.0075, 133.33),
    AUD("Australian Dollar",0.7, 1.43),
    CAD("Canadian Dollar",0.75, 1.33),
    CHF("Swiss Franc",1.05, 0.95),
    CNY("Chinese Yuan Renminbi", 0.14, 7.14),
    SEK("Swedish Krona", 0.11, 9.09),
    NZD("New Zealand Dollar", 0.65, 1.54),
    PLN("Polish Zloty", 0.22, 4.55);

    private final String fullName;
    private final double toUSDExchangeRate;
    private final double fromUSDExchangeRate;
}
