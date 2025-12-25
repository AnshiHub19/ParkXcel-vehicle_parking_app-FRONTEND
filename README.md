Tech Stack

Backend
Flask – API development & server-side logic
Flask-SQLAlchemy – ORM for SQLite database
Flask-Login / JWT – Authentication & session control
SQLite – Lightweight relational DB
Redis – Caching layer & job queue
Celery – Background job processing
Celery Beat – Scheduler for periodic tasks

Frontend
Vue.js – Reactive UI components
Vue CLI – Tooling for Vue-based development
Bootstrap – Responsive styling
Chart.js – Visual representation of analytics
Jinja2 – HTML templating (via CDN if needed)

cd backend
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
flask run

# parking-frontend

## Project setup
npm install

### Compiles and hot-reloads for development
npm run serve

### Compiles and minifies for production
npm run build

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


-----COMMands----

--redis
redis-server redis.conf

--if redis already running
netstat -ano | findstr 6379

--to terminte redis process in bg
taskkill /PID <PID_NUMBER> /F


--celery worker cmd
celery -A tasks.celery_app worker --loglevel=info -P solo


--celery beat cmd
celery -A tasks.celery_app beat --loglevel=info

--testing
from controllers.tasks import send_daily_reminders
send_daily_reminders.delay()  # Async execution
