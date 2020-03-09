const express = require('express');
const fs = require('fs');
const path = require('path');
const nedb = require('nedb');
const basicAuth = require('express-basic-auth');
const app = express();

/****************************
 * your config will grab your approved USERNAME and PASSWORD from your .env
 ****************************/
const config = require('./config');

/****************************
 * your nedb
 ****************************/
// load up nedb
const db = new nedb({ filename: config.NEDB_URI, autoload: true });

/****************************
 * setting up important middleware functionality
 ****************************/
// Handling JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting your static items routes to public
app.use(express.static(path.resolve(__dirname, 'public')));

/****************************
 * your authentication
 ****************************/
const challengeAuth = basicAuth({
  authorizer: myAuthorizer,
  challenge: true,
  unauthorizedResponse: getUnauthorizedResponse
});
//Custom authorizer checking if the username starts with 'A' and the password with 'secret'
function myAuthorizer(username, password) {
  return username == config.USERNAME && password == config.PASSWORD;
}
function getUnauthorizedResponse(req) {
  return 'not authorized';
}

// PASSWORD PROTECT YOUR APP
app.use(challengeAuth);

/****************************
 * your view
 ****************************/
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/index.html'));
});

/****************************
 * API endpoints
 ****************************/

/**
 * GET /api
 */
app.get('/api/v1/hellos', (req, res) => {
  db.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      return err;
    }
    res.json(doc);
  });
});

/**
 * POST /api
 */
app.post('/api/v1/hellos', (req, res) => {
  console.log(req.body);
  db.insert(req.body, (err, doc) => {
    if (err) {
      console.log(err);
      return err;
    }
    res.json(doc);
  });
});

// if all fails go here
app.use((req, res) => {
  res.status(404).send('404 - either not authorized or no route');
});

/*************************
 * create http server and listen
 *************************/
app.listen(config.PORT, () => {
  console.log(`see the magic at http://localhost:${config.PORT}`);
});
