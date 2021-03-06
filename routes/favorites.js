var express = require('express');
var router = express.Router();

/* GET favorites page */
router.get('/', function(req, res, next){
  res.render('favorites', {favorites : req.session.favorites});
});


//added the favorite to an array
router.post('/add', function(req, res, next){

  // Create a favorites array in the session, if it does not exist
  if (!req.session.favorites) {
    req.session.favorites = [];
  }

  // Is this image already a favorite? Ignore
  var isFav = false;
  for (var i = 0 ; i < req.session.favorites.length; i++) {
    if (req.session.favorites[i].date == req.body.date) {
      // already in the array. Redirect.
      isFav = true;  break;
    }
  }

  if (!isFav) {
    // Add all the info about an image to req.session.favorites
    req.session.favorites.push(req.body);
  }
  res.redirect('/favorites');

});

module.exports = router;