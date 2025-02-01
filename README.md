# Initial setup
## Recommended specs
- Node 22.13.0+
- Python 3.9.0+
- Django 5.1+ (`python -m pip install Django`)
- Django REST framework 3.15+ (`python -m pip install djangorestframework`)

## Setup back-end
- `cd back-end`
- `python manage.py runserver`

This opens the server on localhost:8000.

## Setup front-end
- `cd front-end`
- `npm install`
- `npm run dev`

This opens the site on localhost:3000. Both the front-end and the back-end must be running for the application to function.

# Tests
## Back-end
- `cd back-end`
- `python manage.py test`

## Front-end
- `cd front-end`
- `npm run cypress:open` for full interface
    - OR `npm run cypress:component:headless` for quick run of component tests