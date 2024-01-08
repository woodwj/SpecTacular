@echo off

REM Check if Python is installed
echo Looking for Python 3
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Python not found. Installing Python 3...
    REM Add the command to install Python 3 on your system
    exit /b 1
)

REM Start the Python HTTP server in the project directory
echo Starting Python HTTP server...
start python -m http.server

REM Wait for the server to start (optional, adjust as needed)
timeout /nobreak /t 2 >nul

REM Open SpecTacular.html in the default web browser
echo Opening SpecTacular.html in the default web browser...
start http://localhost:8000/Resources/SpecTacular.html

echo Ready for development. Close this window to stop the server.
REM Keep the script running until manually stopped
pause >nul