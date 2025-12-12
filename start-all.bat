@echo off
REM Expense Tracker - Start Both Backend and Frontend
REM This script will start the MySQL service, backend server, and frontend dev server

echo.
echo ================================================
echo   EXPENSE TRACKER - FULL STACK START SCRIPT
echo ================================================
echo.

REM Check if MySQL is running
echo [1/3] Checking MySQL Service...
sc query MySQL80 >nul 2>&1
if %errorlevel% neq 0 (
    echo Attempting to start MySQL80 service...
    net start MySQL80 >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✓ MySQL service started successfully
    ) else (
        echo ✗ Could not start MySQL service
        echo   Make sure MySQL is installed and service name is MySQL80
        pause
        exit /b 1
    )
) else (
    echo ✓ MySQL service is already running
)

echo.
echo [2/3] Starting Backend Server...
echo Opening new terminal for backend (Java Spring Boot on port 8080)...
start cmd /k "cd /d d:\expenses-tracker-api && java -jar target/expense-tracker-api-1.0.0.jar"

timeout /t 3 /nobreak

echo.
echo [3/3] Starting Frontend Dev Server...
echo Opening new terminal for frontend (Vite on port 5173)...
start cmd /k "cd /d d:\expenses-tracker-api\expenses-tracker-frontend && npm run dev"

echo.
echo ================================================
echo   STARTUP COMPLETE
echo ================================================
echo.
echo Backend:  http://localhost:8080/api
echo Frontend: http://localhost:5173
echo.
echo Log in to get started!
echo Press any key to close this window...
pause >nul
