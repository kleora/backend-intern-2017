const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

/* Post schema */
const schema = new Schema({
	_id: Schema.ObjectId,
	postId: String,
	author: String,
	comment: String,
	timestamp: Date
});

var Comment = mongoose.model('comments', schema);

/* Create new post */
Comment.create = function (postId, author, comment, callback){
	let comments = new Comment({
		_id: new ObjectId(),
		postId, author, comment,
		timestamp: new Date()
	});
	
	comments.save(function(err, obj){
		if(err || !obj){
			return callback(err);
		}
		callback(null, obj.toObject());
	});
};

/* List all posts without their content sorted by creation time */
Comment.list = function (callback){
	Comment.find({}, {sort: {timestamp: -1}}, function(err, comments){
		if (err) return callback(err);
		
		callback(null, comments.map(obj => obj.toObject()));
	});
};

/* Get specific post by ID */
Comment.get = function(id, callback){
	Comment.find({'postId': id}, {}, {sort: {timestamp: -1}}, function(err, comments){
		if (err) return callback(err);
		
		callback(null, comments.map(obj => obj.toObject()));
	});
};

module.exports = Comment;