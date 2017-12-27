// the env variable is set to test during the testing process
process.env.NODE_ENV = "test";

const Post = require("../models/posts");
const Comment = require("../models/comments");

// require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

/* POSTS TESTING */
describe("Posts", function() {
    
	/* use special database for testing process
	 * it clears the collection before each test case AND provide one new data
	 * it clears the collection after each test case
	 */
	Post.collection.drop();
	
	beforeEach(function(done) {
		
		var title = "Test Post";
		var content = "Hello world, this is a new post!";
		var author = "user";
		
		Post.create(title, content, author, function(err, posts) {			
			done();
		});
		
	});
	
	afterEach(function(done) {
		
		Post.collection.drop();
		done();
	
	});

	
	/*
	 * test the GET route
	 */
	  
	describe("GET all posts", function() {
		
		// retrieve all posts
		it("it should GET all the posts", function(done) {
			chai.request(server)
			.get("/api/posts")
			.end(function(err, res) {
				
				res.should.have.status(200);
				res.should.be.json;
				res.body._data.should.be.a('array');

				res.body._data[0].should.have.property('_id');
				res.body._data[0].should.have.property('title');
				res.body._data[0].should.have.property('author');
				res.body._data[0].should.have.property('timestamp');
					
				done();
			
			});
		});
		
		// retrieve a spesific post by first adding a new post, and then used 
		// the newly created _id to make the request
		it("it should GET a post having the specified ID", function(done) {
			
			var title = "Test Post";
			var content = "Hello world, this is a new post!";
			var author = "user";
			
			Post.create(title, content, author, function(err, posts){			
			  
				chai.request(server)
					.get('/api/posts/' + posts._id)
					.end(function(err, res){
						
						res.should.have.status(200);
						res.should.be.json;
						res.body._data.should.be.a('object');

						res.body._data.should.have.property('_id');
						res.body._data.should.have.property('title');
						res.body._data.should.have.property('author');
						res.body._data.should.have.property('content');
						res.body._data.should.have.property('timestamp');
				
						done();
					
					});
				
			});
				
		});
		
	});
	
	/*
	 * test the POST route
	 */
	describe("POST a new post", function() {

		// post a new post with URL-encoded body
		it("it should POST a new post", function(done) {
			
			var newPost = "title=New Post&content=This is a new content&author=User";
			
			chai.request(server)
				.post("/api/posts")
				.send(newPost)
				.end((err, res) => {
				
					res.should.have.status(200);
					res.should.be.json;
				    res.body._data.should.be.a('object');
	
					res.body._data.should.have.property('_id');
					res.body._data.should.have.property('title');
					res.body._data.should.have.property('author');
					res.body._data.should.have.property('content');
					res.body._data.should.have.property('timestamp');
					
					done();
							
				});
		
		});
		
	});
	
	/*
	 * test the methods
	 */
	describe("Methods for model Posts", function() {

		// schema for Create a New Post
		var resCreateNewPostSchema = {
									_id      : '_id',
									title    : 'title',
									author   : 'author',
									content  : 'content',
									timestamp: 'timestamp'
								  };
		
		// test create a new post
		it("it should create a new post", function(done) {
			
			var title = "Test method";
			var content = "Method Create for model Posts";
			var author = "User";
			
			Post.create(title, content, author, function(err, posts) {			
				
				posts.should.be.jsonSchema(resCreateNewPostSchema);
				done();
			
			});
			
		});
		
		
		// schema for List All Posts Without Their Content
		var resListAllPostsSchema = [
										{
											_id      : '_id',
											title    : 'title',
											author   : 'author',
											timestamp: 'timestamp'
										}
									];
		
		// test list all posts without their content sorted by creation time
		it("it should get all posts", function(done) {
			
			Post.list(function(err, posts){			
				
				posts.should.be.jsonSchema(resListAllPostsSchema);
				done();
							
			});
			
		});
		
		// schema for Get Specific Post by ID
		var resGetSpecificPostSchema = {
										_id      : '_id',
										title    : 'title',
										author   : 'author',
										content  : 'content',
										timestamp: 'timestamp'
									  };
		
		// test get specific post by ID
		it("it should get specific post by ID", function(done) {
			
			// create dummy data
			var title = "Test method";
			var content = "Method GetByID for model Posts";
			var author = "User";

			Post.create(title, content, author, function(err, posts) {			
				
				Post.get(posts._id, function(err, post){			
				
					posts.should.be.jsonSchema(resGetSpecificPostSchema);
					done();
				
				});
				
			});
			
		});
		
	});

});

/* COMMENTS TESTING */
describe("Comments", function() {
   
	/* use special database for testing process
	 * it clears the collection before each test case AND provide one new data
	 * it clears the collection after each test case
	 */
	Comment.collection.drop();
	
	beforeEach(function(done) {
		
		var IDPost = "58e1f7e678b4c104bd928dcb";
		var comment = "This is the first comment";
		var author = "user";
		
		Comment.create("test", IDPost, comment, author, function(err, posts) {			
			done();
		});
		
	});
	
	afterEach(function(done) {
		
		Comment.collection.drop();
		done();
	
	});
   
	/*
	 * test the GET route
	 */
	describe("GET all comments from spesific post", function() {
		
		// retrieve all comments of a spesific post
		it("it should GET all comments from the specified post", function(done) {
										
			chai.request(server)
			.get("/api/posts/" + "58e1f7e678b4c104bd928dcb" + "/comments")
			.end(function(err, res) {
				
				res.should.have.status(200);
				res.should.be.json;
			    res.body._data.should.be.a('array');

				res.body._data[0].should.have.property('_id');
				res.body._data[0].should.have.property('author');
				res.body._data[0].should.have.property('comment');
				res.body._data[0].should.have.property('timestamp');
				
				done();
			
			});
		
		});
	
	});
   
    /*
	 * test the POST route
	 */
	describe("POST new comment to spesific post", function() {
		
		// retrieve all comments of a spesific post
		it("it should GET all comments from the specified post", function(done) {
			
			// url-encoded data for new comment
			var newComment = "comment=This is a new comment&author=User";
	
			chai.request(server)
				.post("/api/posts/" + "58e1f7e678b4c104bd928dcb" + "/comments/test")
				.send(newComment)
				.end(function(err, res) {
				
					res.should.have.status(200);
					res.should.be.json;
					res.body._data.should.be.a('object');

					res.body._data.should.have.property('_id');
					res.body._data.should.have.property('author');
					res.body._data.should.have.property('comment');
					res.body._data.should.have.property('timestamp');
					
					done();
				
				});
						
		});
	
	});
   
	/*
	 * test the methods
	 */
	describe("Methods for model Comments", function() {

		// schema for Create New Comment On Specific Post
		var resCreateNewCommentOnPostSchema = {
												_id      : '_id',
												author   : 'author',
												comment  : 'comment',
												timestamp: 'timestamp'
											  };

		// create new comment on spesific post
		it("it should create a new comment on specific post", function(done) {
			
			// use the created element (by beforeEach)
			var IDPost = "58e1f7e678b4c104bd928dcb";
			var comment = "This is the first comment";
			var author = "user";
			
			Comment.create("test", IDPost, comment, author, function(err, posts) {			
				posts.should.be.jsonSchema(resCreateNewCommentOnPostSchema);
				done();
			});
						
		});
		
		
		// schema for Get All Comments From Spesific Post
		var resGetAllCommentsFromPost = [
											{
											  _id      : '_id',
											  author   : 'author',
											  comment  : 'comment',
											  timestamp: 'timestamp'
											}
										];

		// get all comments from spesific post
		it("it should fetch all comments from a spesific post", function(done) {
			
			// use the created element (by beforeEach)
			var IDPost = "58e1f7e678b4c104bd928dcb";
			var comment = "This is the first comment";
			var author = "user";
			
			// add one dummy comment for the post
			Comment.create("test", IDPost, comment, author, function(err, posts) {						
				Comment.get(IDPost, function(err, comments){			
					
					posts.should.be.jsonSchema(resGetAllCommentsFromPost);
					done();
				
				});
			});
			
		});
	
	});
	
});