const db = require('../models');
const router = require('express').Router();

router.get('/', (req, res) => {
	console.log("Favorites page");
	db.user.findOne({
		where: {id:req.user.id},
		include: [db.favorite]
	})
	.then(function(user){
		res.render('favorites/show', {user})
	})
	.catch(function(error){
		console.log(error);
	})
})

//Adding a favorite to database and then displaying/rendering it onto the favorites page
//Also setting up the many to many relation
router.post('/', (req, res) => {
	console.log('post rte')
	db.favorite.findOrCreate({where:{
		name: req.body.name,
		serving: req.body.serving,
		url: req.body.url,
		image: req.body.image
	}})
	.spread(function(favorite, wasCreated){
		db.user.findOne({
			where: {id:req.user.id}
		})
		.then(function(user){
			console.log("we found the user");
			console.log(user.id, favorite.id)
			user.addFavorite(favorite.id);
			res.redirect('/favorites');
		})
		.catch(function(error){
			console.log(error);
		})
	})
	.catch(function(error){
		console.log(error);
	})
});

module.exports = router;