const Post = require("../models/posts");
const Comment = require("../models/comments");

module.exports = function(router){
	
	// API list all posts
	router.get("/posts", function(req, res) {
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
	router.get("/posts/:_id", function(req, res) {
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
	
	// API create new post
	// 
	// URL endpoint: 
	// POST /api/posts
	// 
	// Body (URL-encoded)
	// title=<title>&content=<content>&author=<author>
	
	router.post("/posts", function(req, res) {
		
		var title = req.body.title;
		var content = req.body.content;
		var author = req.body.author;
		
		// validate the input
		Post.create(title, content, author, function(err, posts){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				
				// Error response format:
				/*
					{
						"_error": {
							"title": {
								"kind": "required"
							}
						}
					}
				*/
				
				if (title == null || content == null || author == null) {
					
					//var tmpObj = "{'title': {'kind': 'required'}}";
					
					res.json({"_errors": posts});
				
				} else {
				
					res.json({ "_data": posts });		
				
				}
				
			}
		});
	
	});
	
	// API get all comments from a spesific post
	router.get("/posts/:_id/comments", function(req, res) {
		
		// get the post ID
		const _id = req.params._id;
		
		Comment.get(_id, function(err, comments){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				res.json({ "_data": comments });		
			}
		});
		
	});
	
	// API create new comment on spesific post
	// [DEVELOPMENT STATE]
	// Body (URL-encoded):
	// comment=<comment>&author=<author>
	
	router.post("/posts/:_id/comments", function(req, res) {
	
		var IDPost = req.params._id;
	
		var comment = req.body.comment;
		var author = req.body.author;
		
		Comment.create("development", IDPost, comment, author, function(err, posts){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				res.json({ "_data": posts });		
			}
		});
		
	});
	
	
	// API create new comment on spesific post
	// [TESTING STATE]
	// Body (URL-encoded):
	// comment=<comment>&author=<author>
	
	router.post("/posts/:_id/comments/test", function(req, res) {
	
		var IDPost = req.params._id;
	
		var comment = req.body.comment;
		var author = req.body.author;
		
		Comment.create("test", IDPost, comment, author, function(err, posts){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				res.json({ "_data": posts });		
			}
		});
		
	});
	
};