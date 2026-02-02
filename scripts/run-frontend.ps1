Set-StrictMode -Version Latest

# Move to client folder
Set-Location (Join-Path $PSScriptRoot '..\client')

# Install deps if node_modules missing
if (-not (Test-Path node_modules)) {
    Write-Output "Installing frontend dependencies..."
    npm install
}

Write-Output "Starting Vite dev server (npm run dev)..."
npm run dev
