# Backend Technical Endpoints

Here is a list of all the endpoints that the backend have.

## Authentication Endpoints

- `POST /auth/register`: Register a new user.
- `POST /user/register`: Login a user.

## User Endpoints

- `POST /user/register`: Registers by body.username
- `GET /user/profile/:userId`: Get a single user by ID.
- `PUT /user/update-password/:userId`: Update a user's password by ID.
- `PUT /user/deactivate/:userId`: Deactivate a user by ID.

## Post Endpoints

- `POST /quiz/:builderUserId`: Create a new quiz by builderUserId.

## Quiz Endpoints

- `GET /answer/:quizId`: Get a single quiz by ID.
- `POST /answer/:quizId`: Create a new answer by quizId.

## Accessing the results of Quizzes

- `GET /result/:builderId/quizzes`: Get all quizzes for a builder.
- `GET /result/:quizId/players`: Get all players for a quiz.

# Frontend Technical Endpoints

## Authentication Endpoints

- "/": Homepage
- "/login": Login
- "/signup": Signup
- "/userprofile": User Profile
- "/player/dashboard": Player Dashboard
- "/builder/dashboard": Builder Dashboard
- "/builder/quizform": Builder Quiz Form
- "/player/quizpage": Player Quiz Page

