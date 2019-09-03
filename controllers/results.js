const db = require('../models');
const router = require('express').Router();
const axios = require('axios');

router.get('/search', (req, res) => {
	res.render('results/search');
})

router.post('/results', (req, res) => {
	let q = req.body.recipe;
	let app_key = process.env.APP_KEY;
	let app_id = process.env.APP_ID;
	let url = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&from=0&to=20`;
	
	axios.get(url)
	.then(response => {
		//console.log(response.data.hits);
		var recipeResults = response.data.hits;

		let recipes = recipeResults.map(results => {
			let label = results.recipe.label;
			let image = results.recipe.image;
			let url = results.recipe.url;
			let serving = results.recipe.yield;
		
			return {
				label,
				image,
				url,
				serving
			}
		})
		res.render('results/results', {recipes});
	})
	.catch(error => {
		if(error){
			console.log(error);
			res.send("There was an error processing your request");
		}
	})
});

module.exports = router;