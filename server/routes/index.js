var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// Handles login form POST from index.html
router.post('/',
    passport.authenticate('local', {}),
    (req, res, next) => {
		console.log('login handler');
		req.session.save((err) => {
				if (err) {
						return next(err);
				}

				res.status(200).send('OK');
		});
	}
);

// Handle index file separately
// Also catches any other request not explicitly matched elsewhere
router.get('/', function(req, res) {
  console.log("request for index");
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/*', function(req, res) {
  console.log("404 : ", req.params);
  res.sendStatus(404);
});

module.exports = router;
