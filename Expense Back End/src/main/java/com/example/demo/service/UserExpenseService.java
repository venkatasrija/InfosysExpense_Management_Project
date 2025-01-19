package com.example.demo.service;

import com.example.demo.model.Expense;
import java.util.List;

public interface UserExpenseService {
    String createExpense(Expense expense);
    List<Expense> getAllExpenses();
    String removeUserExpense(Long expenseId);
}
