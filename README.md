# shuffleFit
Web application for randomizing routine workout sessions.

Mongoose Express Node React-Redux/Router

App created to mix-up workouts. Complete the form
on the home page to customize a random workout for
the day. Login to the app to keep track of workouts. 
Next time you login the app will auto-populated 
the form based on your previous workout. Body groups 
will be toggled between upper and lower body each 
day in order to promote even distribution of 
routines.

Core exercises using the kettlebell can be
substituted with dumbbells for the same effect.

Registered users have the option to delete 
their profile from the database.

Admins have an added option to the add routines to 
the database. This page has three forms for adding 
either lower body, upper body or core exercise to 
the database. All fields are required for posting 
a upper or lower body routine. All fields but the 
last are required for posting a core routine.

Application in prototyping phase with minimal styling.

Use the provided template files to build the necessary config files:
1. src/utils/config.js
2. secrets.js

To run server script and application:
npm run start-dev
