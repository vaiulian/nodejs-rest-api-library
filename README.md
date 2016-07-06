# nodejs-rest-api-library

## Synopsis

A basic express REST API app using nodejs, mongoose, mocha and chai to administer a virtual library.

As a database i set up mongoose with a free account at [Mlab.com](https://mlab.com/) - just for the sake of trying something new.

Also when running **mocha** tests, the app uses a different database, in order to make clear assumptions about what are we testing.

```
process.env.NODE_ENV = 'test';
```

## Motivation

The project exists as a way to better understand the nodejs/express environment and for me personally, to understand the testing method of **mocha**, **chai**, **chaiHttp** and **chai.should()**.

## Install

```
git clone https://github.com/vaiulian/nodejs-rest-api-library.git
npm install
nodejs index.js
```

####  Middleware

The app uses a simple form of authentification for all the API calls.
Basically a call should first be made to **/login** with the credentials `usename` and `password`. For simplicity credentials are hardcoded to `iulianv` and `iulian1`

This will return a token that has to be send for every other API call.

## Tests

You could simply run cURLs commands:

* Get the token
```
curl -X POST -d '{"username" : "iulianv", "password" : "iulian1"}' -H "content-type:application/json" http://localhost:3000/
```

Demo token
```
_token_ = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NjgzNTk4NTE3MjJ9.1p93oIxwlID__S3jxJXjtUjHWgVYH7YZEGpDqPNVQlE
```

* Add a new Book
```
curl -X POST -d '{"title" : "Added book", "author" : "Added Author", "year":1998}' -H "content-type:application/json" -H "x-access-token:_token_" http://localhost:3000/api/books
```

* Retrive all Books
```
curl -X GET -H "content-type:application/json" -H "x-access-token:_token_" http://localhost:3000/api/books
```

* Retrive Book by _id
```
curl -X GET -H "content-type:application/json" -H "x-access-token:_token_" http://localhost:3000/api/books/:book_id
```

* Update Book by _id
```
curl -X PUT -d '{"title" : "Updated book"}' -H "content-type:application/json" -H "x-access-token:_token_" http://localhost:3000/api/books/:book_id
```

* Delete Book by _id
```
curl -X DELETE -H "content-type:application/json" -H "x-access-token:_token_" http://localhost:3000/api/books/:book_id
```


Or use mocha framework to test all at once.
Make sure you have mocha globally installed first. Also make sure the server is not running. Run the following:

```
npm -g install mocha
mocha
```
