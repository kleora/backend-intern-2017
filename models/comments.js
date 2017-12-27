const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

/* Post schema */
const schema = new Schema({
	_id: Schema.ObjectId,
	postId: String,
	comment: String,
	author: String,
	timestamp: Date
});

var Comment = mongoose.model('comments', schema);

/* Create new post */
Comment.create = function (postId, comment, author, callback){
	let f_comment = new Comment({
		_id: new ObjectId(),
		posId, comment, author,
		timestamp: new Date()
	});

	f_comment.save(function(err, obj){
		if(err || !obj){
			return callback(err);
		}
		callback(null, obj.toObject());
	});
};

/* List all posts without their content sorted by creation time */
Comment.list = function (callback){
	Comment.find({}, {Comment: 0}, {sort: {timestamp: -1}}, function(err, comments){
		if (err) return callback(err);

		callback(null, comments.map(obj => obj.toObject()));
	});
};

/* Get specific post by ID */
Comment.get = function(_id, callback){
	Comment.findOne({_id}, function(err, obj){
		if (err || !obj) return callback(err);
		callback(null, obj.toObject());
	});
};

module.exports = Comment;
