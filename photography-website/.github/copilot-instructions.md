<!-- Copilot / AI agent instructions for the photography-website repo -->

# Purpose
This file gives concise, actionable context for AI coding agents working on this repository: primary architecture, developer workflows, conventions, and integration points needed to be productive quickly.

## Quick snapshot
- Fullstack app: Django backend + React (Vite) frontend.
- Backend code: [backend/backend](backend/backend) (Django project). See [backend/backend/settings.py](backend/backend/settings.py#L1) for configuration.
- Frontend code: [frontend](frontend) (Vite + React). See [frontend/package.json](frontend/package.json#L1).
- Database: SQLite at [backend/db.sqlite3](backend/db.sqlite3) by default (settings fall back to SQLite if `DATABASE_URL` unset).

## How to run locally (typical dev flow)
- Backend (from repo root):

```bash
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r backend/requirements.txt
cd backend
python manage.py migrate
python manage.py runserver
```

- Frontend (from repo root):

```bash
cd frontend
npm install
npm run dev   # starts Vite on 5173
```

Notes:
- Backend settings load `.env` from `backend/backend/.env` (see `load_dotenv(BASE_DIR / 'backend' / '.env')` in settings). Put SECRET_KEY, DEBUG, DATABASE_URL, and email credentials there for local testing.
- CORS in settings already allows React/Vite dev origins (`http://localhost:3000`, `http://localhost:5173`).

## Project-specific workflows & scripts
- Embeddings / face search:
  - The embedding generator script is `backend/generate_embeddings.py`. Run from repo root with `python backend/generate_embeddings.py`. It imports `apps.photos.models.Photo` and saves face embeddings to `Photo.embedding`.
  - The face-search app uses a precomputed pickle (`face_gallery.pkl`) read in [backend/face_search/utils.py](backend/face_search/utils.py#L1). When updating embeddings, regenerate and update that pkl or the DB-backed embeddings.

- Static/media handling:
  - Media files stored under `backend/media` (see `MEDIA_ROOT` in settings).
  - Static files collected to `staticfiles` and served with WhiteNoise in development/hosting; run `python backend/manage.py collectstatic` when preparing a deploy build.

## Conventions and patterns to follow
- Django apps are contained under `backend/apps/*` (e.g., `apps.photos`, `apps.categories`). Follow the existing `serializers.py`, `views.py`, `urls.py` layout for new features.
- Frontend components follow `src/components/*` and use Vite + React patterns. Use `axios` for HTTP client calls to the Django API.
- Face embeddings: multiple face embeddings per image are represented as a list; code expects potentially multiple embeddings per `Photo` (see `generate_embeddings.py` and `face_search/utils.py`).

## Integration points and external deps
- Python packages: see `backend/requirements.txt`. Notable packages: `face_recognition`, `djangorestframework`, `corsheaders`, `whitenoise`.
- Frontend: dependencies in `frontend/package.json` include `face-api.js` (client face-detection) and React ecosystem libs.
- Cloudinary is present but commented out in settings — if enabling, update `CLOUDINARY_*` env vars and `DEFAULT_FILE_STORAGE`.

## Tests & lint
- Django tests: run `python backend/manage.py test` from `backend`.
- Frontend lint: `cd frontend && npm run lint`.

## Common gotchas seen in this repo
- Nested Django project directory: project package is at `backend/backend` (so DJANGO_SETTINGS_MODULE is `backend.settings`). Ensure PYTHONPATH or working directory aligns when running scripts.
- `.env` location matters: `backend/backend/.env` is loaded explicitly by settings — update that file rather than a top-level `.env`.
- Precomputed `face_gallery.pkl` is used on startup by `face_search/utils.py` — missing/old pkl will affect face-search endpoints.

## Where to look for examples
- API patterns and custom exception handler: [backend/backend/settings.py](backend/backend/settings.py#L1) and [backend/apps/exceptions.py](backend/apps/exceptions.py#L1).
- Photo model and embedding usage: `backend/apps/photos/models.py` (use it as a reference when adding features that touch images/embeddings).

---
If any section is unclear or you want more detail (e.g., exact env var names, CI commands, or deploy steps), tell me which area to expand and I will iterate.
