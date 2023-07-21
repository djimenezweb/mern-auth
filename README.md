# MERN Authentication

A web app using the MERN Stack (MongoDB, Express, React and Node.js) following Shaun Pelling's tutorials: [MERN Stack](https://www.youtube.com/watch?v=98BzS5Oz5E4) and [MERN Auth](https://www.youtube.com/watch?v=WsRBmwNkv3Q).

- In this web application users can sign up, save and retrieve their workouts.
- The server is made with [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/). It manages the requests to MongoDB and handles the responses.
- User info and workouts are stored in [MongoDB](https://www.mongodb.com/). Passwords are hashed with [bcrypt](https://www.npmjs.com/package/bcrypt).
- Login tokens are generated with [JSON Web Tokens](https://jwt.io/).

## Install

Run `npm install` in both client and server folders to install the modules.

Then run `npm run dev` in each folder.

## Dependencies

### Server

- [bcrypt 5.0.1](https://www.npmjs.com/package/bcrypt)
- [cors 2.8.5](https://www.npmjs.com/package/cors)
- [dotenv 16.3.1](https://www.npmjs.com/package/dotenv)
- [express 4.18.2](https://www.npmjs.com/package/express)
- [jsonwebtoken 9.0.1](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose 7.3.1](https://www.npmjs.com/package/mongoose)
- [nodemon 3.0.1](https://www.npmjs.com/package/nodemon)
- [validator 13.9.0](https://www.npmjs.com/package/validator)

### Client

- [date-fns](https://www.npmjs.com/package/date-fns)
- [react 18.2.0](https://www.npmjs.com/package/react)
- [react-dom 18.2.0](https://www.npmjs.com/package/react-dom)
- [react-router-dom 6.14.1](https://www.npmjs.com/package/react-router-dom)
- [eslint 8.38.0](https://www.npmjs.com/package/eslint)
- [vite 4.3.9](https://www.npmjs.com/package/vite)
