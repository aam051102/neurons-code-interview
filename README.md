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

This opens the site on localhost:3000. Both the front-end and the back-end must be running for the application to function. The application will then be accessible at `localhost:3000/survivors`

To use the application to its fullest, you will need a survivor ID. Register yourself as a survivor by going to `localhost:3000/survivors`, pressing "Register Survivor" and filling in the form. You will be provided with an ID, which can be entered by pressing the "Login" button in the navigation bar.

# Tests
## Back-end
- `cd back-end`
- `python manage.py test`

## Front-end
- `cd front-end`
- `npm run cypress:open` for full interface
    - OR `npm run cypress:component:headless` for quick run of component tests