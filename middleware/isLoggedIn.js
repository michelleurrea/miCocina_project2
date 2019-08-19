module.exports = (req, res, next) => {
  // If the user is logged in
  if (req.user) {
    // Cool. This is expected. They are logged in. Aloow them to proceed.
    next();
  }
  else  { // Otherwise, user is not logged in
    // Not cool. Don't let them in. Make them log in FIRST!
    req.flash('error', 'You must be logged in to view this page!');
    res.redirect('/auth/login');
  }
}
