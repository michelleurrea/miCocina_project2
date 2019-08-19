module.exports = (req, res, next) => {
  // If the user is logged in
  if (req.user && req.user.admin) {
    // Cool. This is expected. They are logged in. Aloow them to proceed.
    next();
  }
  else if (req.user) { // The user is logged in but NOT AN ADMIN!
    req.flash('error', 'Hey! You are NOT an admin! Quit sneaking around!');
    res.redirect('/profile');
  }
  else  { // Otherwise, user is not logged in
    // Not cool. Don't let them in. Make them log in FIRST!
    req.flash('error', 'You must be logged in first!');
    res.redirect('/auth/login');
  }
}
