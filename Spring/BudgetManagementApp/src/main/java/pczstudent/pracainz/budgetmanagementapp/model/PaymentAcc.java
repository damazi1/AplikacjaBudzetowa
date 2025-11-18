package pczstudent.pracainz.budgetmanagementapp.model;


public interface PaymentAcc {
    String name = "";
    Currency currency = null;
    String userId = "";
    double balance = 0;

    public Currency getCurrency();
}
