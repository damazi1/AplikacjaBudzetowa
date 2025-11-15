package pczstudent.pracainz.budgetmanagementapp.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pczstudent.pracainz.budgetmanagementapp.model.Category;
import pczstudent.pracainz.budgetmanagementapp.service.CommonService;

import java.util.List;

@RestController
@RequestMapping("/categories")
@AllArgsConstructor
public class CategoryController {
    private final CommonService commonService;

    @PostMapping("/add")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category savedCategory = commonService.addCategory(category);
        return ResponseEntity.ok(savedCategory);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories(){
        List<Category> categories = commonService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}
