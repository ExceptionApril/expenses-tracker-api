package com.expensestracker.controller;

import com.expensestracker.dto.response.ApiResponse;
import com.expensestracker.dto.response.ReportResponse;
import com.expensestracker.service.ReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {
    
    private static final Logger log = LoggerFactory.getLogger(ReportController.class);
    
    private final ReportService reportService;
    
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }
    
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<ReportResponse>> getSummary(
            @RequestHeader("userId") Long userId,
            @RequestParam(required = false) String month,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        try {
            if (month != null && !month.isEmpty()) {
                YearMonth yearMonth = YearMonth.parse(month);
                startDate = yearMonth.atDay(1);
                endDate = yearMonth.atEndOfMonth();
            } else if (startDate == null || endDate == null) {
                YearMonth currentMonth = YearMonth.now();
                startDate = currentMonth.atDay(1);
                endDate = currentMonth.atEndOfMonth();
            }
            
            log.info("Generating report for user {} from {} to {}", userId, startDate, endDate);
            
            ReportResponse report = reportService.generateMonthlyReport(userId, startDate, endDate);
            return ResponseEntity.ok(ApiResponse.success(report));
            
        } catch (Exception e) {
            log.error("Error generating report: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to generate report: " + e.getMessage()));
        }
    }
}