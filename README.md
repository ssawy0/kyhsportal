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
