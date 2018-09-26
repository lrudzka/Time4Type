# Time4Type

## Description
Application for typing results of football matches. The application has been used for typing during the Word Cup in Russia, and it was to be changed for the Champions League 2018/2019, but I have created new version, as you can see in my Github profile.

### Options available to an unlogged user:

- rules of the typing
- history of the games at the current event
- ranking of the users

### Options available to a logged user:

- entering result types of the incoming matches
- overview of the user's typing history
- possibility to delete a type entered before and reenter the type once again - if the match hasn't started yet

## Technologies

The application was created using React.

Other technologies used by me for this project: EcmaScript 2015, HTML5, CSS, Sass

The application uses Fetch to get data from free football API, and also to save data in my data-base created at Firebase. 

The application uses Google Log-in Component for React.

## RWD

Page is fully responsive, there should be no troubles in accessing it on any device. Media queries in css changes page layout accordingly to the device viewport size.

## Installation

If you want to run/develop the code, you need to recreate the development environment based on package.json file - you need to install the components listed in there (by using npm install in bash console in project folder). To run the site you need to compile jsx files into out.js - it can be done in one of two ways:

- use dev-server - use command "npm run start" in bash console, it will start the server locally with preprocessed jsx and sass code. 

- build the site - use command "npm run build" in bash console. The entire site will be built in build folder.



