Group 10 - Midnight Coders (CW2 Web Project)

Our application is hosted at https://chattingsroom.herokuapp.com/
Please note: when accessing the website, there may be a slight delay of up to one minute when loading the site initially, this is due to the free plan of Heroku we are using. This doesn't happen every time.

We used Spring Boot for this project, therefore if you would like to run our code, we suggest using Eclipse or Visual Studio code. We have some team members using either of these without problems. If you have any issues running our code, please contact us and we will be more than happy to help.

To create the database if you are trying to host our code locally, you will need to change some files. We used MySQLWorkbench, where we setup a local database called "localhost" with port 3306, the username must be set to "root", the password must be set to "password". Inside this we created a schema called "chatrooms". If you setup the database like this, you will not need to change any code.

If you do change any of these settings mentioned above, "applications.properties" file within the code will need to be changed. The top three non comment lines are where these changes will be made. These three lines have been copied below, with the capitalised words being those that need changing depending on how you created your database.

jdbc:mysql://DATABASE_NAME:PORT/SCHEMA_NAME?useSSL=true
spring.datasource.username = USERNAME
spring.datasource.password = PASSWORD

The microservices used in this application can be found in the src/main/java/group10/ChatRoom/microservices