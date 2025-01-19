package com.example.demo.service;

import com.example.demo.model.Category;
import com.example.demo.model.Notification;
import com.example.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private NotificationService notificationService;

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public String createCategory(Category category) {
        Notification notification = new Notification();
        notification.setUserId(category.getUserId());
        notification.setMessage("A New Category has been created.");
        notificationService.createNotification(notification);
        categoryRepository.save(category);  // Remove nextId usage
        return "Added";
    }

    @Override
    public String removeUserCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
        return "Remove success";
    }
}
