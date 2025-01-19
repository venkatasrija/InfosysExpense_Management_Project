package com.example.demo.service;

import com.example.demo.model.Expense;
import com.example.demo.model.Notification;
import com.example.demo.repository.UserExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserExpenseServiceImpl implements UserExpenseService {
    @Autowired
    private UserExpenseRepository userExpenseRepository;
    @Autowired
    private NotificationService notificationService;

    @Override
    public String createExpense(Expense expense) {
        userExpenseRepository.save(expense);
        Notification notification = new Notification();
        notification.setUserId(expense.getUserId());
        notification.setMessage("A New Expense has been added.");
        notificationService.createNotification(notification);
        return "Expense added successfully";
    }

    @Override
    public List<Expense> getAllExpenses() {
        return userExpenseRepository.findAll();
    }

    @Override
    public String removeUserExpense(Long expenseId) {
        if (userExpenseRepository.existsById(expenseId)) {
            userExpenseRepository.deleteById(expenseId);
            return "Expense deleted successfully";
        } else {
            throw new IllegalArgumentException("Expense not found with ID: " + expenseId);
        }
    }
}
