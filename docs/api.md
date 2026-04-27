# Api Reference

| Method              | Endpoint              | Auth | Purpose                | Request                                                     | Response             | Test |
| ------------------- | --------------------- | ---- | ---------------------- | ----------------------------------------------------------- | -------------------- | ---- |
| **Auth**            |                       |      |                        |                                                             |                      |      |
| GET                 | /auth/me              | Yes  | Get current user       |                                                             | {user}               | [ ]  |
| POST                | /auth/login           | No   | Login User             | {email, password}                                           | {accessToken}        | [ ]  |
| POST                | /auth/logout          | No   | Logout User            |                                                             | 200                  |
| POST                | /auth/refresh         | No   | Refresh JWT            | cookie: refreshToken                                        | {accessToken}        | [ ]  |
| POST                | /auth/register        | No   | Create User            | {email, password, firstName, lastName}                      | {accessToken, user}  | [ ]  |
| **Calories**        |                       |      |                        |                                                             |                      |      |
| GET                 | /calories             | Yes  | Get all calorie logs   |                                                             | {calories[]}         | [ ]  |
| GET                 | /calories/:id         | Yes  | Get calorie log by id  |                                                             | {calorie}            | [ ]  |
| POST                | /calories             | Yes  | Add calorie entry      | {calories, calorieGoalSnapshot?}                            | {calorie}            | [ ]  |
| PUT                 | /calories/:id         | Yes  | Update calorie entry   | {calories, calorieGoalSnapshot?}                            | {calorie}            | [ ]  |
| DELETE              | /calories/:id         | Yes  | Delete calorie entry   |                                                             | {calorie}            | [ ]  |
| **Routines**        |                       |      |                        |                                                             |                      |      |
| GET                 | /routines             | Yes  | Get all routine logs   |                                                             | {routines[]}         | [ ]  |
| GET                 | /routines/:id         | Yes  | Get routine log by id  |                                                             | {routine}            | [ ]  |
| POST                | /routines             | Yes  | Add routine entry      | {name, description?}                                        | {routine}            | [ ]  |
| PUT                 | /routines/:id         | Yes  | Update routine entry   | {name, description?}                                        | {routine}            | [ ]  |
| DELETE              | /routines/:id         | Yes  | Delete routine entry   |                                                             | {routine}            | [ ]  |
| **Weight**          |                       |      |                        |                                                             |                      |      |
| GET                 | /weights              | Yes  | Get all weight logs    |                                                             | {weights[]}          | [ ]  |
| GET                 | /weights/:id          | Yes  | Get weight log by id   |                                                             | {weight}             | [ ]  |
| POST                | /weights              | Yes  | Add weight entry       | {weightLb, date?}                                           | {weight}             | [ ]  |
| PUT                 | /weights/:id          | Yes  | Update weight entry    | {weightLb, date?}                                           | {weight}             | [ ]  |
| DELETE              | /weights/:id          | Yes  | Delete weight entry    |                                                             | {weight}             | [ ]  |
| **Exercise**        |                       |      |                        |                                                             |                      |      |
| GET                 | /exercises            | Yes  | Get all exercise logs  |                                                             | {exercises[]}        | [ ]  |
| GET                 | /exercises/:id        | Yes  | Get exercise log by id |                                                             | {exercise}           | [ ]  |
| POST                | /exercises            | Yes  | Add exercise entry     | {name, muscleGroup, description?, mediaUrl?}                | {exercise}           | [ ]  |
| PUT                 | /exercises/:id        | Yes  | Update exercise entry  | {name, muscleGroup, description?, mediaUrl?}                | {exercise}           | [ ]  |
| DELETE              | /exercises/:id        | Yes  | Delete exercise entry  |                                                             | {exercise}           | [ ]  |
| **RoutineExercise** |                       |      |                        |                                                             |                      |      |
| GET                 | /routineExercises     | Yes  | Get all RE logs        |                                                             | {routineExercises[]} | [ ]  |
| GET                 | /routineExercises/:id | Yes  | Get RE log by id       |                                                             | {routineExercise}    | [ ]  |
| POST                | /routineExercises     | Yes  | Add RE entry           | {routineId, exerciseId, orderIndex, targetSets, targetReps} | {routineExercise}    | [ ]  |
| PUT                 | /routineExercises/:id | Yes  | Update RE entry        | {routineId, exerciseId, orderIndex, targetSets, targetReps} | {routineExercise}    | [ ]  |
| DELETE              | /routineExercises/:id | Yes  | Delete RE entry        |                                                             | {routineExercise}    | [ ]  |
