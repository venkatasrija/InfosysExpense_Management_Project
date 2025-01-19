package com.example.demo.service;

import com.example.demo.model.Notification;
import com.example.demo.model.Reports;
import com.example.demo.repository.ReportsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class UserReportServiceImpl implements UserReportService {
    @Autowired
    private ReportsRepository reportsRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public List<Reports> getReports(Long userId) {
        return reportsRepository.findByUserId(userId);
    }

    @Override
    public List<Reports> createReport(Reports reports) {
        Notification notification = new Notification();
        notification.setUserId(reports.getUserId());
        notification.setMessage("A New Report has been generated.");
        notificationService.createNotification(notification);

        reports.setGeneratedDate(LocalDateTime.now());
        reportsRepository.save(reports);
        return reportsRepository.findAll();
    }

    @Override
    public List<Reports> removeUserReport(Long reportId) {
        reportsRepository.deleteById(reportId);
        return reportsRepository.findAll();
    }

    @Override
    public List<Reports> getAllReports() {
        return reportsRepository.findAll();
    }
}
