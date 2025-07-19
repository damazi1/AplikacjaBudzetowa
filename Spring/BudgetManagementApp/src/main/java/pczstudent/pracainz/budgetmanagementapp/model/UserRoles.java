package pczstudent.pracainz.budgetmanagementapp.model;

public enum UserRoles {
    USER("User"),
    ADMIN("Admin");

    private final String fullName;

    UserRoles(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }
}
