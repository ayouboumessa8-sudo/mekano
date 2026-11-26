@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>&1
if %errorlevel%==0 (
  start "MEKANO Maroc" http://localhost:8080/
  py server.py
) else (
  where python >nul 2>&1
  if %errorlevel%==0 (
    start "MEKANO Maroc" http://localhost:8080/
    python server.py
  ) else (
    echo Python 3 is required to run MEKANO locally.
    pause
  )
)
endlocal
