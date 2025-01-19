package com.example.demo.controller;

import com.example.demo.model.Expense;
import com.example.demo.service.UserExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/admin/expense")
@CrossOrigin(origins = "http//localhost:1234")
public class AdminExpenseController {
    @Autowired
    private UserExpenseService userExpenseService;

    @GetMapping("/getexpenses")
    public ResponseEntity<List<Expense>> getExpenses() {
        return ResponseEntity.ok(userExpenseService.getAllExpenses());
    }
}
