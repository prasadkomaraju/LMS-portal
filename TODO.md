# Admin CRUD for Courses and Lessons - Progress Tracker

## Overall Plan
- Add admin auth with fixed credentials.
- Create User (admin), Course, Lesson models.
- Auth routes: login/register (seed admin).
- Protected admin CRUD routes for courses/lessons.
- Middleware for auth/admin check.
- Update server.js with middleware/routes.

## Steps (to be marked [x] when done):

### 1. Install dependencies
- [ ] bcryptjs, jsonwebtoken, cors, express-rate-limit?
- Update package.json scripts.

### 2. Create models\n- [x] backend/models/User.js\n- [x] backend/models/Course.js\n- [x] backend/models/Lesson.js"


### 3. Create middleware\n- [x] backend/middleware/auth.js (JWT verify)\n- [x] backend/middleware/admin.js (role check)"


### 4. Create routes\n- [x] backend/routes/auth.js (POST /api/auth/login, /register seed)\n- [x] backend/routes/admin.js (CRUD /api/admin/courses/*, /lessons/*)"


### 5. Update server.js\n- [x] Add express.json(), cors(), route mounts (/api prefix)."


### 6. Setup .env
- [ ] Add JWT_SECRET, ensure MONGO_URI.

### 7. Test
- [ ] npm install && node server.js
- [ ] Login as admin, test CRUD with Postman/curl.

**Current step: 1/7**
