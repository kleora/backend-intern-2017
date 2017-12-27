const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

/** @Represent Comment schema */
const schema = new Schema({
	_id: Schema.ObjectId,
	author: String,
	comment: String,
    post_id: String,
	timestamp: Date
});

var Comment = mongoose.model('comments', schema);

/** @Represent Create new comment */
Comment.create = function (author, comment, post_id, callback){
	let komen = new Comment({
		_id: new ObjectId(),
		author, comment, post_id,
		timestamp: new Date()
	});
	
	komen.save(function(err, obj){
		if(err || !obj){
			return callback(err);
		}
		callback(null, obj.toObject());
	});
};

/** @Represent List all comments sorted by creation time */
Comment.list = function (_id, callback){
	Comment.find({post_id : _id}, null, {sort: {timestamp: -1}}, function(err, comments){
		if (err) return callback(err);
		
		callback(null, comments.map(obj => obj.toObject()));
	});
};

module.exports = Comment;