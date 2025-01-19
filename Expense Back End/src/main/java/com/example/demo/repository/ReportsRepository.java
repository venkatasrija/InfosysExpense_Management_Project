package com.example.demo.repository;

import com.example.demo.model.Reports;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportsRepository extends JpaRepository<Reports, Long> {

    // Custom query to fetch reports by userId
    List<Reports> findByUserId(Long userId);
}
