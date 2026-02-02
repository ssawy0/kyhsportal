Set-StrictMode -Version Latest

# Start both backend and frontend in separate PowerShell windows
$root = Split-Path -Parent $MyInvocation.MyCommand.Definition

$backendScript = Join-Path $root 'run-backend.ps1'
$frontendScript = Join-Path $root 'run-frontend.ps1'

Write-Output "Starting backend in a new PowerShell window..."
Start-Process -FilePath 'powershell' -ArgumentList '-NoExit','-ExecutionPolicy','Bypass','-File', $backendScript

Start-Sleep -Seconds 1

Write-Output "Starting frontend in a new PowerShell window..."
Start-Process -FilePath 'powershell' -ArgumentList '-NoExit','-ExecutionPolicy','Bypass','-File', $frontendScript

Write-Output "Launched backend and frontend windows. Close those windows to stop the servers."
