Set-StrictMode -Version Latest

# Move to backend folder
Set-Location (Join-Path $PSScriptRoot '..\backend')

# Create venv if missing
if (-not (Test-Path .venv)) {
    Write-Output "Creating virtual environment..."
    python -m venv .venv
    & .\.venv\Scripts\python.exe -m pip install --upgrade pip
    & .\.venv\Scripts\python.exe -m pip install -r requirements.txt
}

Write-Output "Running migrations..."
& .\.venv\Scripts\python.exe manage.py migrate --noinput

Write-Output "Starting Django development server on http://0.0.0.0:8000/"
& .\.venv\Scripts\python.exe manage.py runserver 0.0.0.0:8000
