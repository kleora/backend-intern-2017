const Comment = require("../models/comments");
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

module.exports = function(router){

	// API find all posts
	router.get("/posts/:postId/comments", function(req, res){
		Comment.find({postId:req.params.postId},function(err, comments){
			if (err) {
				res.status(500);
				res.json({_message: err});
			} else {
				res.json({ "_data": comments });
			}
		});
	});


	// API  post by id
	router.post("/posts/:postId/comments", function(req, res){
		//console.log(req.body);
		const postId = req.params.postId;
		const comment = req.body.comment;
		const author = req.body.author;
		let f_comment = new Comment({
			_id: new ObjectId(),
			postId: postId,
			author: author,
			comment: comment,
			timestamp: new Date()
		})

		f_comment.save(function(err,result){
			console.log(result)
			res.json({"_data" : result});
		})

	});

};
