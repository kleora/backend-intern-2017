const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

/* Post schema */
const schema = new Schema({
	_id: Schema.ObjectId,
	title: String,
	content: String,
	author: String,
	timestamp: Date
});

var Post = mongoose.model('posts', schema);

/* Create new post */
Post.create = function (title, content, author, callback){

	//"use strict";
	var post = new Post({
		_id: new ObjectId(),
		title, content, author,
		timestamp: new Date()
	});
	
	post.save(function(err, obj){
		if(err || !obj){
			return callback(err);
		}
		callback(null, obj.toObject());
	});

};

/* List all posts without their content sorted by creation time */
Post.list = function (callback){
	Post.find({}, {content: 0}, {sort: {timestamp: -1}}, function(err, posts){
		if (err) return callback(err);
		
		callback(null, posts.map(obj => obj.toObject()));
	});
};

/* Get specific post by ID */
Post.get = function(_id, callback){
	Post.findOne({_id}, function(err, obj){
		if (err || !obj) return callback(err);
		callback(null, obj.toObject());
	});
};

module.exports = Post;