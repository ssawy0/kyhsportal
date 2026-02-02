# PowerShell helper: activate venv (assumes .venv in backend) and generate ERD
$backend = Join-Path $PSScriptRoot '..\backend'
Set-Location $backend
if (-Not (Test-Path '.venv')){
    Write-Host "No venv found in $backend\.venv. Creating one..."
    python -m venv .venv
}
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
pip install django-extensions pydot graphviz eralchemy -q
# Note: Graphviz system binary must be installed and on PATH for dot to run
python manage.py graph_models -a -o erd.png
Write-Host "ERD generation attempted; check erd.png in $backend"
