package com.expensestracker.dto.request;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class AccountRequest {
    
    @NotBlank(message = "Account name is required")
    @Size(max = 100, message = "Account name must not exceed 100 characters")
    private String accountName;
    
    @NotNull(message = "Account type is required")
    private String accountType;
    
    @NotNull(message = "Initial balance is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Balance cannot be negative")
    private BigDecimal balance;

    // --- ADDED: Missing fields for Wallets ---
    private String color;
    private String cardNumber;
    private String cardHolder;
    private String expiryDate;
    
    public AccountRequest() {
    }
    
    public AccountRequest(String accountName, String accountType, BigDecimal balance, 
                          String color, String cardNumber, String cardHolder, String expiryDate) {
        this.accountName = accountName;
        this.accountType = accountType;
        this.balance = balance;
        this.color = color;
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
        this.expiryDate = expiryDate;
    }
    
    // --- Getters and Setters ---

    public String getAccountName() { 
        return accountName; 
    }
    public void setAccountName(String accountName) { 
        this.accountName = accountName; 
    }
    
    public String getAccountType() { 
        return accountType; 
    }
    public void setAccountType(String accountType) { 
        this.accountType = accountType; 
    }
    
    public BigDecimal getBalance() { 
        return balance; 
    }
    public void setBalance(BigDecimal balance) { 
        this.balance = balance; 
    }

    // --- New Getters/Setters ---
    public String getColor() { 
        return color; 
    }
    public void setColor(String color) { 
        this.color = color; 
    }

    public String getCardNumber() { 
        return cardNumber; 
    }
    public void setCardNumber(String cardNumber) { 
        this.cardNumber = cardNumber; 
    }

    public String getCardHolder() { 
        return cardHolder; 
    }
    public void setCardHolder(String cardHolder) { 
        this.cardHolder = cardHolder; 
    }

    public String getExpiryDate() { 
        return expiryDate; 
    }
    public void setExpiryDate(String expiryDate) { 
        this.expiryDate = expiryDate; 
    }
}