# Description

## Important notes
In order to use the app you shound change in server/config/config.js url for Atlas Mongo DB database and in client/.env file you should store following data:

DATABASE=base-login (I will delete this after grading is done) 
PASSWORD=<--PASSWORD--> (I will delete this after grading is done)

Default port for connection to the express server is 5000 and default proxy set in package.json in client folder is
http://localhost:5000. In case you are using Mac change default port to 3001 as 5000 is not allowed on Mac. Also don't forget to change on proxy last part of the string (5000 to 3001)
## Components
App is divided in separate components and coresponding folders:

## Redux toolkit

For state management Redux toolkit is used. For fetching API data redux thunk middleware is used.
## Server and database

For server express is used and all server logic is stored in server folder. 

## UI

For UI Material UI (MUI) library is used. 