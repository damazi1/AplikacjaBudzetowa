package pczstudent.pracainz.budgetmanagementapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pczstudent.pracainz.budgetmanagementapp.model.Category;
import pczstudent.pracainz.budgetmanagementapp.model.Currency;
import pczstudent.pracainz.budgetmanagementapp.repository.CategoryRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class CommonService {
    CategoryRepository categoryRepository;

    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Currency> getAllCurrencies() {
        return List.of(Currency.values());
    }
}
