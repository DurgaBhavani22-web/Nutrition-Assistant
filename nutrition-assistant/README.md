# Nutrition Assistant

A full-stack MERN application (MongoDB, Express, React, Node) built
around the architecture, ER diagram, and feature set described in the
project document: user registration/profiles, food & diet-plan
tracking scaffolding, and personalized nutrition suggestions generated
from each user's profile (age, weight, height, gender, activity
level).

## Structure

```
nutrition-assistant/
├── server/              Express + Mongoose backend (MVC)
│   ├── controllers/      SuggestedController.js, userController.js
│   ├── db/                config.js (Mongo connection)
│   ├── middlewares/       authMiddleware.js (JWT)
│   ├── models/             Suggestion.js, User.js
│   ├── routes/              suggestionRoute.js, userRoute.js
│   ├── utils/                 suggestNutrition.js (BMR/TDEE + macros)
│   └── server.js               Express entry point
└── client/              React (Vite) frontend
    └── src/
        ├── components/    Home.jsx, LNavbar.jsx
        ├── pages/           LandingPage, Login, Register
        │   ├── Plans/         NewPlan, NewSuggestion, SuggestedNutrition
        │   └── User/           UnavBar, UserData
        └── api.js            Axios client (attaches JWT)
```

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # then fill in MONGO_URI / JWT_SECRET
npm run dev            # nodemon server.js -> http://localhost:8000
```

Requires a running MongoDB instance (local or Atlas) at the URI in `.env`.

### 2. Frontend

```bash
cd client
npm install
npm run dev             # -> http://localhost:5173
```

## API summary

| Method | Route                  | Auth | Description                          |
|--------|-------------------------|------|---------------------------------------|
| POST   | /api/users/register      | –    | Create an account                     |
| POST   | /api/users/login          | –    | Log in, returns JWT                   |
| GET    | /api/users/profile          | JWT  | Get current user's profile            |
| PUT    | /api/users/profile            | JWT  | Update profile fields                 |
| POST   | /api/suggestions                | JWT  | Generate + save a nutrition suggestion|
| GET    | /api/suggestions                  | JWT  | List current user's suggestions       |
| GET    | /api/suggestions/:id                | JWT  | Get one suggestion                    |
| DELETE | /api/suggestions/:id                  | JWT  | Delete a suggestion                   |

## Notes

- Nutrition math (BMR via Mifflin-St Jeor, TDEE, macro split) lives in
  `server/utils/suggestNutrition.js` — adjust the macro ratios or
  calorie-adjustment constants there if you want different defaults.
- `NewPlan.jsx` is currently a local-only form; wire it to a
  `/api/plans` endpoint (mirroring the `Suggestion` model, scoped by
  `startDate`/`endDate`) if diet plans need to persist separately from
  one-off suggestions.
- Food-item tracking (the `Food`/`Meal` entities from the ER diagram)
  isn't implemented yet — the current scope covers auth, profiles, and
  suggestion generation. Add `Food`/`Meal` models plus their own
  controller/routes following the same MVC pattern to extend it.
