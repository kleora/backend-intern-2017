const Post = require("../models/posts");
const Comment = require("../models/comments");

module.exports = function(router){

    // Get Home Page for browser interfaces
    router.get("/", function(req, res){
        res.render("index", {title : 'Prelo'});
    });
    
	// API list all posts
	router.get("/posts", function(req, res){
		Post.list(function(err, posts){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
//                res.json({ "_data": posts });
				res.render("post", { data: posts });
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
//				res.json({ "_data": post });
                res.render("post_main", { data : post });
			}
		});
	});
    
    // API post for post
    router.post("/posts", function(req, res){
        
        var title = req.body.title;
        var content = req.body.content;
        var author = req.body.author;
		
        Post.create( title, content, author, function(err, posts){    
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
//                res.json({ "_data": posts });
				res.redirect("/api/posts");
			}
		});
	});
    
    // API get comments
	router.get("/posts/:_id/comments", function(req, res){
		const _id = req.params._id;
		Comment.list(_id, function(err, comments){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
//				res.json({ "_data": comments });
                res.render("comment", { data : comments, post_id : _id });
			}
		});
	});

    // API post comment
    router.post("/posts/:_id/comments", function(req, res){
        
        var comment = req.body.comment;
        var author = req.body.author;
        var _id = req.params._id;
		
        Comment.create( author, comment, _id, function(err, comments){    
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
//                res.json({ "_data": comments });
				res.redirect("/api/posts/"+comments.post_id+"/comments");
			}
		});
	});
    
};