# Database Table Design

## Users

- id (PK)
- email (unique)
- password_hash
- first_name
- last_name
- avatar_color
- goal_weight_lb
- daily_calorie_goal
- created_at

## Weight

- id (PK)
- user_id (FK)
- weight_lb
- date
- created_at

## Calories

- id (PK)
- user_id (FK)
- date
- total_calories
- calorie_goal_snapshot
- created_at

## Exercises

- id (PK)
- name
- muscle_group
- media_url
- created_at

## Routines

- id (PK)
- user_id (FK)
- name
- created_at

## RoutineExercises

- id (PK)
- routine_id (FK)
- exercise_id (FK)
- order_index
- target_sets
- target_reps

