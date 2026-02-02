# kyhsportal — Nonprofit Portal (scaffold)

Repository: kyhsportal

This repository contains a minimal scaffold of a Django REST backend and a small React (Vite) frontend for a nonprofit articles + members app.

Structure
- backend/ - Django project
- client/  - Vite React client (minimal)

Quick start (Windows PowerShell)

```powershell
cd C:\workspace\apps\portal\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Frontend

```powershell
cd C:\workspace\apps\portal\client
npm install
npm run dev
```

Generate ER diagram (requires Graphviz installed on system PATH)

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
pip install django-extensions pydot graphviz eralchemy
python manage.py graph_models -a -o erd.png
```

Notes
- Settings use SQLite by default for quick local development. To use PostgreSQL set POSTGRES_* env vars.
- `django_extensions` is registered in `backend/nonprofit_portal/settings.py` and `GRAPH_MODELS` contains default options.

Run locally
-----------

Quick steps to run the backend (Django) and frontend (Vite) locally on Windows PowerShell.

Backend (Django)

1. Create and activate a virtual environment (or let the helper scripts create it):

```powershell
cd C:\Workspace\apps\portal\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Frontend (Vite)

1. Install dependencies and start the dev server:

```powershell
cd C:\Workspace\apps\portal\client
npm install
npm run dev
# or: npm start
```

Helper scripts

There are convenient PowerShell scripts in the `scripts/` folder to make this easier:

- `scripts\\run-backend.ps1` — ensures a venv exists, installs backend deps (if needed), runs migrations and starts Django on port 8000.
- `scripts\\run-frontend.ps1` — installs frontend deps (if needed) and starts the Vite dev server.
- `scripts\\start-dev.ps1` — opens two PowerShell windows and runs the backend and frontend scripts concurrently.

Usage (from project root):

```powershell
cd C:\Workspace\apps\portal
# start backend only
.\scripts\run-backend.ps1
# start frontend only
.\scripts\run-frontend.ps1
# start both (new windows)
.\scripts\start-dev.ps1
```

Notes
- These scripts assume you have Python 3.10+ and Node.js (18+) installed and available on PATH.
- On first run the scripts will create virtualenv and install required packages; this may take a few minutes.
