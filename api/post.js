const Post = require("../models/posts");

module.exports = function(router){
	
	// API list all posts
	router.get("/posts", function(req, res){
		Post.list(function(err, posts){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				res.json({ "_data": posts });		
			}
		});
	});
	
	// API get post by id
	router.get("/posts/:_id", function(req, res){
		const _id = req.params._id;
		Post.get(_id, function(err, post){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				res.json({ "_data": post });		
			}
		});
	});

};