const router = require('express').Router();
const insert = require('../controllers/insert.js');
const dateString = require('../components/dateString.js');

router.route('/').post((req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  let userData;

  req.on('data', (chunk) => {
    userData = JSON.parse(chunk);
  });

  req.on('end', () => {
    try {
      insert(userData.username, userData.serverName);
      res.send('Inserted user: ' + JSON.stringify(userData));
    }
    catch (error) {
      console.error(dateString(), '- got error');
      console.error(error);
      res.send([ 0, 'caught error, check if user was inserted with fetch' ])
    }
  });
});

module.exports = router;