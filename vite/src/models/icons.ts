export type Category = {
    value: string;
    label: string;
    icon: string;      // nazwa ikony w Iconify, np. "mdi:home-outline"
    color?: string;    // opcjonalny kolor tła „badge”
};

export const CATEGORIES: Category[] = [
    { value: "car", label: "Car", icon: "mdi:car", color: "#3da9fc" },
    { value: "food", label: "Food & Drink", icon: "mdi:silverware-fork-knife", color: "#ff8e3c" },
    { value: "shopping", label: "Shopping", icon: "mdi:cart-outline", color: "#9b59b6" },
    { value: "work", label: "Work", icon: "mdi:briefcase-outline", color: "#5b6d7a" },
    { value: "beauty", label: "Beauty", icon: "mdi:flower-outline", color: "#8e44ad" },
    { value: "home", label: "Home", icon: "mdi:home-outline", color: "#c8a165" },
    { value: "family", label: "Family & Personal", icon: "mdi:account-group-outline", color: "#2aa198" },
    { value: "transport", label: "Transport", icon: "mdi:bus", color: "#3498db" },
    { value: "groceries", label: "Groceries", icon: "mdi:food-apple-outline", color: "#f1c40f" },
    { value: "sport", label: "Sport & Hobbies", icon: "mdi:basketball", color: "#e67e22" }
];