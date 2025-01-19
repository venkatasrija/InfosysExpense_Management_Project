package com.example.demo.controller;
import com.example.demo.model.Admin;
import com.example.demo.model.LoginRequest;
import com.example.demo.model.User;
import com.example.demo.service.AdminService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin")
@CrossOrigin(origins = "http//localhost:1234")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private AdminService adminService;

    @GetMapping("/getAllUser")
    public List<User> getAllUser(){
        List<User> allUser  = userService.getAllUser();
        return allUser;
    }

    @PostMapping("/register")
    public String createAdmin(@RequestBody Admin admin) {
        adminService.createAdmin(admin);
        return "Registration Successful";
    }

    @PostMapping("/login")
    public String userLogin(@RequestBody LoginRequest loginRequest) {
        Admin admin = adminService.adminLogin(loginRequest);
        return "Login Successful";
    }
}
