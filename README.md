# CHALLENGE | Backend

<div>
    <img alt="Static Badge" src="https://img.shields.io/badge/Node.js-18.14.2-%23339933?style=flat-square&logo=nodedotjs">
    <img alt="Static Badge" src="https://img.shields.io/badge/Express-4.17.1-%23000000?style=flat-square&logo=express">
    <img alt="Static Badge" src="https://img.shields.io/badge/MongoDB%20Compass-1.39.4-%2347A248?style=flat-square&logo=mongodb">
    <img alt="Static Badge" src="https://img.shields.io/badge/Git-2.39.1-%23F05032?style=flat-square&logo=git">
    <img alt="Static Badge" src="https://img.shields.io/badge/Jest-29.6.4-%23C21325?style=flat-square&logo=jest">
    <img alt="Static Badge" src="https://img.shields.io/badge/Docker-20.10.21-%232496ED?style=flat-square&logo=docker">
    <img alt="Static Badge" src="https://img.shields.io/badge/Postman-10.17.7-%23FF6C37?style=flat-square&logo=postman">
</div>

<br>

The Challenge is an API that provides access to a database collection of music albums.

---

## Installation

1. Clone the repository locally.

```shell
git clone git@github.com:dreweloper/challenge-backend.git
```

2. Change to the project directory.

```shell
cd challenge-backend
```

3. Install the dependencies using `npm`.

```shell
npm install
```

4. Create the `.env` file in the root of the project and set the following environment variables:

- `PORT`: port to which the server is listening.
- `MONGODB_URI`: the MongoDB deployment connection string.
- `MONGODB_URI_TEST`: the MongoDB deployment connection string for testing purposes.

You can also configure a local development URI by setting `MONGODB_URI` and `MONGODB_URI_TEST` to a local MongoDB server URI, like this:

```javascript
MONGODB_URI=mongodb://localhost:27017/challenge-backend

MONGODB_URI_TEST=mongodb://localhost:27017/challenge-backend-testing
```

This will allow you to work with a local MongoDB database during development.

5. Start the application in your local development environment.

```shell
npm run start
```

## Technologies

- **Node.js:** (Version 18.14.2) - Asynchronous event-driven JavaScript runtime designed to build scalable network applications.
- **Express:** (Version 4.17.1) - Web framework for building web applications and APIs.
- **Mongoose:** (Version 7.5.0) - ODM (Object-Document Mapping) library used to interact with the MongoDB database in Node.js.
- **Jest:** (Version 29.6.4) - JavaScript code testing library.
- **express-validator:** (Version 7.0.1) - Middleware for Express.js that simplifies and enhances the validation of incoming request data.
- **Docker:** (Version 20.10.21, build baeda1f) - Container platform for application deployment.
- **Git:** (Version 2.39.1) - Version control system used to track and manage the source code of this project.
- **JSDoc:** (Version 4.0.2) - JSDoc format documentation generation tool for JavaScript code.
- **Postman:** (Version 10.17.7) - Platform for testing and documenting APIs, used for the development and testing of this project's API.

## API documentation

See the [documentation in Postman](https://documenter.getpostman.com/view/26092515/2s9YC1Wu4D) for detailed information about the API endpoints, including sample requests, parameters and responses.

## Deployment

The application has been deployed as a web service using a Docker image on the Render platform.