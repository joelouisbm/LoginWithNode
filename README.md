# Basic Login with Node (express) using Cookies

Server in nodejs with basic login using cookies,
authentication and user recording.

## Technologies used

- bcrypt
- cookie-parser
- cors
- debug
- dotenv
- express
- http-errors
- jsonwebtoken
- mongoose

## Estructure

## Rest

**Base URL**: [...:5000](...:5000)
The base url will be determined from the site where the server is hosted,
by default it uses port 5000 but it can be modified in the .env
file found in the root of the project.

The server has two entry points, one for user authentication
and the other for user administration.

### Endpoints of users

**GET** .../user

**GET** .../user/**:id**

**POST** .../user/register

**PUT** .../user/**:id**

**DELETE** .../user/**:id**

## Endpoints for authentication (Login)

**POST** ...:5000/account/login

**GET** ...:5000/account/auth

**GET** ...:5000/account/logout
