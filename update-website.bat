@echo off
setlocal
cd /d "%~dp0"

set "GIT_EXE=C:\Program Files\Git\cmd\git.exe"
if not exist "%GIT_EXE%" set "GIT_EXE=git"

echo Checking Git...
"%GIT_EXE%" --version >nul 2>&1
if errorlevel 1 (
  echo Git is not available. Please install Git first.
  pause
  exit /b 1
)

echo Staging changes...
"%GIT_EXE%" add -A
if errorlevel 1 (
  echo Failed to stage changes.
  pause
  exit /b 1
)

"%GIT_EXE%" diff --cached --quiet
if not errorlevel 1 (
  echo No changes found. Nothing to publish.
  pause
  exit /b 0
)

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format \"yyyy-MM-dd HH:mm:ss\""') do set "TS=%%i"
set "MSG=Website update %TS%"

echo Committing changes...
"%GIT_EXE%" commit -m "%MSG%"
if errorlevel 1 (
  echo Commit failed.
  pause
  exit /b 1
)

echo Pushing to GitHub...
"%GIT_EXE%" push
if errorlevel 1 (
  echo Push failed. Check your internet or GitHub login.
  pause
  exit /b 1
)

echo.
echo Done! Your site will auto-update in about 1-2 minutes.
echo Live URL: https://sjamalanwar.github.io/PAHSFAS-website/
pause
