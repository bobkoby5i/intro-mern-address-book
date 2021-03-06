REM heroku git:remote -a koby5i-mern-address-book-be
REM heroku config:set MERN_ADDRESS_BOOK_JWT_SECRET=<secret>
REM heroku config:set MONGO_MERN_ADDRESS_BOOK_URI="mongodb+srv://<user>:<password>@<host>/intro-address-book-db?retryWrites=true&w=majority",
REM heroku buildpacks:set https://github.com/bobkoby5i/subdir-heroku-buildpack.git
REM heroku buildpacks:add heroku/nodejs
REM heroku config:set PROJECT_PATH=backend

call heroku git:remote -a koby5i-mern-address-book-be
git push heroku develop:main

REM heroku git:remote -a koby5i-mern-address-book-fe
REM heroku config:set REACT_APP_WEATHER_API_KEY=2022-05-01_HEROKU_ENV


REM heroku buildpacks:add heroku/nodejs
REM heroku config:set PROJECT_PATH=frontend
call heroku git:remote -a koby5i-mern-address-book-fe
git push heroku develop:main