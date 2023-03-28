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

Install the required dependencies using `npm i`

Start the API by running `npm start`

The API will start on port 3001. You can test the API by sending HTTP requests to http://localhost:3001.

## Usage 

The API has the following endpoints:


/api/users

* GET: retrieves all users
* GET /:userId: retrieves a single user by ID
* POST: creates a new user
* PUT /:userId: updates a user by ID
* DELETE /:userId: deletes a user by ID


/api/users/:userId/friends/:friendId

* POST: adds a friend to the user's friend list
* DELETE: removes a friend from the user's friend list


/api/thoughts

* GET: retrieves all thoughts
* GET/:thoughtId: retrieves a single thought by id
* POST: creates a new thought
* PUT/:thoughtId: updates a thought by id
* DELETE/:thoughtId: deletes a thought by ID


/api/thoughts/:thoughtId/reactions

* POST: adds a reaction to a thought by ID
* DELETE: removes a reaction from a thought by ID

# Technology 


* MongoDB
* Mongoose

## License 
N/A

## Credits 

N/A

## Questions 

If you have any question, contact me:

Github: Tweetwee1810

Email: Tweetwee1996@gmail.com
