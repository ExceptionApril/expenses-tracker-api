package com.expensestracker.controller;

import com.expensestracker.dto.response.ApiResponse;

import com.expensestracker.dto.response.ReportResponse;

import com.expensestracker.service.ReportService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
class ReportController {
    
    private final ReportService reportService;
    
    /**
     * Get spending summary report
     * GET /api/reports/summary?month=2025-01
     * Or GET /api/reports/summary?startDate=2025-01-01&endDate=2025-01-31
     */
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<ReportResponse>> getSummary(
            @RequestHeader("userId") Long userId,
            @RequestParam(required = false) String month,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        try {
            // If month is provided, use it
            if (month != null && !month.isEmpty()) {
                YearMonth yearMonth = YearMonth.parse(month);
                startDate = yearMonth.atDay(1);
                endDate = yearMonth.atEndOfMonth();
            } else if (startDate == null || endDate == null) {
                // Default to current month if no parameters provided
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