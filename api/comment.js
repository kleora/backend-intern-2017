const Comment = require("../models/comments");

module.exports = function(router){
	
	// API list all posts
	router.get("/comments", function(req, res){
		Comment.list(function(err, comments){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				var i;
				for(i = 0; i < comments.length; i++) {
    				delete comments[i].__v;
				}
				res.json({ "_data": comments });		
			}
		});
	});
	
	// API get post by id
	router.get("/posts/:_id/comments", function(req, res){
		const postId = req.params._id;
		Comment.get(postId, function(err, comments){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				for(i = 0; i < comments.length; i++) {
    				delete comments[i].__v;
    				delete comments[i].postId;
				}
				res.json({ "_data": comments });		
			}
		});
	});

	router.post("/posts/:_id/comments", function(req, res){
		if (!req.body.author || !req.body.comment) {
    		handleError(res, "Invalid user inputs", "Must provide author and comment.", 400);
  		}
  		const postId = req.params._id;
		var author = req.body.author;
		var comment = req.body.comment;

		Comment.create(postId, author, comment, function(err, comments){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				delete comments.__v;
				delete comments.postId;
				res.json({ "_data": comments });		
			}
		});
	});
};