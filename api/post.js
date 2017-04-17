const Post = require("../models/posts");

module.exports = function(router){
	
	// API list all posts
	router.get("/posts", function(req, res){
		Post.list(function(err, posts){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				var i;
				for(i = 0; i < posts.length; i++) {
    				delete posts[i].__v;
				}
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
				delete post.__v;
				res.json({ "_data": post });		
			}
		});
	});

	router.post("/posts", function(req, res){
		if (!req.body.title || !req.body.content || !req.body.author) {
    		handleError(res, "Invalid user inputs", "Must provide a title, content and author.", 400);
  		}
		var title = req.body.title;
		var content = req.body.content;
		var author = req.body.author;
		Post.create(title, content, author, function(err, posts){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				delete posts.__v;
				res.json({ "_data": posts });		
			}
		});


	});

};