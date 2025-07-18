package pczstudent.pracainz.budgetmanagementapp.model;

import lombok.Getter;

@Getter
public enum Currency {
    USD("United States Dollar"),
    EUR("Euro"),
    GBP("British Pound Sterling"),
    JPY("Japanese Yen"),
    AUD("Australian Dollar"),
    CAD("Canadian Dollar"),
    CHF("Swiss Franc"),
    CNY("Chinese Yuan Renminbi"),
    SEK("Swedish Krona"),
    NZD("New Zealand Dollar"),
    PLN("Polish Zloty");

    private final String fullName;

    Currency(String fullName) {
        this.fullName = fullName;
    }

}
