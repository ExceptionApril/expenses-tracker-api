@echo off
cd /d d:\expenses-tracker-api
start java -jar target/expense-tracker-api-1.0.0.jar
timeout /t 5
curl -s -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"Welcome1!\"}"
