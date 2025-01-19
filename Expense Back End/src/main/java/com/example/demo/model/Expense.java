package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

@Entity
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expenseId")
    private Long expenseId;
    private Long userId;
    private String userName;
    private Double amount;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private String date;

    private String category;
    private String description;

    public Expense() {}

    public Expense(Long expenseId, Long userId, String userName, Double amount, String date, String category, String description) {
        this.expenseId = expenseId;
        this.userId = userId;
        this.userName = userName;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.description = description;
    }

    // Getters and setters...

    public Long getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(Long expenseId) {
        this.expenseId = expenseId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
