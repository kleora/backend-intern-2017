const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

/* Comment schema */
const schema = new Schema({
	_id: Schema.ObjectId,
	_idPost: Schema.ObjectId,
	comment: String,
	author: String,
	timestamp: Date
});

var Comment = mongoose.model('comments', schema);

/* Get all comments from a specific post */
Comment.get = function(IDComment, callback) {
	
	Comment.find({_idPost: {$in: [IDComment]}}, {_idPost: 0}, {sort: {timestamp: -1}}, function(err, posts) {
		if (err) return callback(err);
		
		callback(null, posts.map(obj => obj.toObject()));
	});
	
};

/* Create new comment on spesific post */
Comment.create = function(testOrDev, IDPost, comment, author, callback) {
	
	"use strict";
	let comm = new Comment({
		_id: new ObjectId(),
		_idPost: ObjectId(IDPost), 
		comment, author,
		timestamp: new Date()
	});
	
	comm.save(function(err, obj){
		if(err || !obj){
			return callback(err);
		}
		
		var new_obj;
		
		if (testOrDev == "development") {
			new_obj = {"__v": 0, 
						"_id": obj._id, 
						"comment": obj.comment, 
						"author": obj.author,
						"timestamp": obj.timestamp
					};
		} else {
			new_obj = {"__v": 0, 
						"_id": obj._id, 
						"_idPost": obj._idPost,
						"comment": obj.comment, 
						"author": obj.author,
						"timestamp": obj.timestamp
					};
		}
		
		callback(null, new_obj);
	});
	
};

module.exports = Comment;