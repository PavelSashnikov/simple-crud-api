# simple-crud-api

## getting started
 - install node.js  
 - clone or download repo
 - install dependencies (npm i)
 ---
 ## usage
 ```npm run start:dev``` -- start the server (dev): will be started with ```nodemon```  
 
 ```npm run start:prod``` -- create bundle with ```webpack``` and start it

 ```npm run test``` -- run tests. You have to start the server before running tests
___
Server supports methods *GET POST PUT DELETE* and use in-memory DB:  
    * **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`  
    * **POST** `/person` is used to create record about new person and store it in database  
    * **PUT** `/person/${personId}` is used to update record about existing person  
    * **DELETE** `/person/${personId}` is used to delete record about existing person from database

API path `/person[/personId]` required

