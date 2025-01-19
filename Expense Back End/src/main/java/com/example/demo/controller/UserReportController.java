package com.example.demo.controller;

import com.example.demo.model.Reports;
import com.example.demo.service.UserReportService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:1234")
public class UserReportController {
    @Autowired
    private UserReportService userReportService;

    @Autowired
    private UserService userService;

    @PostMapping("/{userId}/report/add")
    public ResponseEntity<List<Reports>> addUserReport(@RequestBody Reports reports, @PathVariable Long userId) {
        reports.setUserId(userId);
        reports.setGeneratedDate(LocalDateTime.now());
        reports.setUserName(userService.getUserById(userId).getUserName());
        List<Reports> response = userReportService.createReport(reports);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}/report/delete/{reportId}")
    public ResponseEntity<List<Reports>> deleteUserReport(@PathVariable Long userId, @PathVariable Long reportId) {
        List<Reports> response = userReportService.removeUserReport(reportId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/report/all")
    public List<Reports> getReports(@PathVariable Long userId) {
        return userReportService.getReports(userId);
    }
}
