# Social-Network-API

## Description

This is a RESTful API for a social networking application. It allows users to create profiles, connect with other users, post content, and interact with each other.

## Table of Contents 
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Technology](#technology)
- [License](#license)
- [Questions](#questions)

## Installation 
To get started, clone this repository to your local machine:

`git clone https://github.com/tweetwee1810/Social-Network-API`

`npm i`

`npm start`

This will start the API on port 3001. You can test the API by sending HTTP requests to http://localhost:3001.

## Usage 
User Endpoints
GET /users
Returns a list of all users in the system.

GET /users/:userId
Returns information about a specific user.

POST /users
Creates a new user in the system.

PUT /users/:userId
Updates information about a specific user.

DELETE /users/:userId
Deletes a specific user from the system.

Connection Endpoints
GET /connections
Returns a list of all connections in the system.

GET /connections/:connectionId
Returns information about a specific connection.

POST /connections
Creates a new connection between two users.

PUT /connections/:connectionId
Updates information about a specific connection.

DELETE /connections/:connectionId
Deletes a specific connection from the system.

Post Endpoints
GET /posts
Returns a list of all posts in the system.

GET /posts/:postId
Returns information about a specific post.

POST /posts
Creates a new post in the system.

PUT /posts/:postId
Updates information about a specific post.

DELETE /posts/:postId
Deletes a specific post from the system.


# Technology 

Express
MongoDB
Mongoose

## License 
N/A

## Credits 

N/A

## Questions 

If you have any question, contact me:

Github: Tweetwee1810

Email: Tweetwee1996@gmail.com
