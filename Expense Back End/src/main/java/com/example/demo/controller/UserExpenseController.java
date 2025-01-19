package com.example.demo.controller;

import com.example.demo.model.Expense;
import com.example.demo.service.UserExpenseService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:1234")
public class UserExpenseController {
    @Autowired
    private UserExpenseService userExpenseService;

    @Autowired
    private UserService userService;

    @PostMapping("/{userId}/expense/add")
    public ResponseEntity<List<Expense>> addExpense(@RequestBody Expense expense, @PathVariable Long userId) {
        expense.setUserId(userId);
        expense.setUserName(userService.getUserById(userId).getUserName());
        userExpenseService.createExpense(expense);
        return ResponseEntity.ok(userExpenseService.getAllExpenses());
    }

    @DeleteMapping("/{userId}/expense/delete/{expenseId}")
    public ResponseEntity<List<Expense>> deleteExpense(@PathVariable Long expenseId) {
        userExpenseService.removeUserExpense(expenseId);
        return ResponseEntity.ok(userExpenseService.getAllExpenses());
    }

    @GetMapping("/{userId}/expense/all")
    public ResponseEntity<List<Expense>> getUserExpenses(@PathVariable Long userId) {
        List<Expense> userExpenses = userExpenseService.getAllExpenses()
                .stream()
                .filter(expense -> expense.getUserId().equals(userId))
                .toList();
        return ResponseEntity.ok(userExpenses);
    }
}
