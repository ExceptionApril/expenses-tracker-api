package com.expensestracker.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRequest {
    
    @NotBlank(message = "Category name is required")
    @Size(max = 100, message = "Category name must not exceed 100 characters")
    private String categoryName;
    
    @NotBlank(message = "Category type is required")
    @Pattern(regexp = "NEEDS|WANTS|SAVINGS", message = "Category type must be NEEDS, WANTS, or SAVINGS")
    private String categoryType;
    
    @Size(max = 50, message = "Icon must not exceed 50 characters")
    private String icon;
}