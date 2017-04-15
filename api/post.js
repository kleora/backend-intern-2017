const Post = require("../models/posts");
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

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

	// API  post by id
	router.post("/posts", function(req, res){
		//console.log(req.body);

		const title = req.body.title;
		const content = req.body.content;
		const author = req.body.author;
		let post = new Post({
			_id: new ObjectId(),
			title: title,
			content: content,
			author: author,
			timestamp: new Date()
		})

		post.save(function(err,result){
			console.log(result)
			res.json({"_data" : result});
		})
		
	});

};
