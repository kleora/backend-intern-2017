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

/* POSTS TESTING */
describe("Posts", function() {
    
	/* use special database for testing process
	 * it clears the collection before each test case AND provide one new data
	 * it clears the collection after each test case
	 */
	Post.collection.drop();
	
	beforeEach(function(done){
		
		/*
		Post.remove({}, function(err) { 
			done();         
        });
		*/		
		
		var title = "Test Post";
		var content = "Hello world, this is a new post!";
		var author = "user";
		
		Post.create(title, content, author, function(err, posts){			
			
			done();
			
		});
		
		/*
		var newPost = new Post({
			_id: new ObjectId(),
			title: "Test Post",
			content: "Hello world, this is a new post!",
			author: "user",
			timestamp: ISODate("2017-04-02T09:37:34.002Z")
		});
		newPost.save(function(err) {
			done();
		});
		*/
		
	});
	
	afterEach(function(done){
		Post.collection.drop();
		
		/*
		Post.remove({}, function(err) { 
			done();         
        });
		*/		
		
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
				//res.should.be.json;
				//res.body.should.be.a('array');
				//res.body.length.should.be.eql(0);
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
						//res.body.should.be.a('object');
						//res.body.should.have.property('_id');
						//res.body.should.have.property('name');
						//res.body.should.have.property('lastName');
						//res.body.name.should.equal('Super');
						//res.body.lastName.should.equal('man');
						//res.body._id.should.equal(data.id);
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
		// Format: title=<title>&content=<content>&author=<author>
		it("it should POST a post", function(done) {
			
			var newPost = "title=New Post&content=This is a new content&author=User";
			
			chai.request(server)
				.post("/api/posts")
				.send(newPost)
				.end((err, res) => {
				
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					
					res.body._data.should.have.property('_id');
					res.body._data.should.have.property('title');
					res.body._data.should.have.property('author');
					res.body._data.should.have.property('content');
					res.body._data.should.have.property('timestamp');
					
					done();
					
					//res.body.should.have.property('_errors');
					//res.body._errors.should.have.property('title');
					//res.body._errors.title.should.have.property('kind').eql('required');
						
					//done();
					
					//res.body.should.have.property('errors');
					//res.body.errors.pages.should.have.property('kind').eql('required');
				
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
	
	beforeEach(function(done){
		
		var IDPost = "58e1f7e678b4c104bd928dcb";
		var comment = "This is the first comment";
		var author = "user";
		
		Comment.create("test", IDPost, comment, author, function(err, posts){			
			
			done();
			
		});
		
	});
	
	afterEach(function(done){
		Comment.collection.drop();
		done();
	});
   
	/*
	 * test the GET route
	 */
	describe("GET all comments from spesific post", function() {
		
		// retrieve all comments of a spesific post
		it("it should GET all comments from the specified post", function(done) {
							
			var IDPost = "58e1f7e678b4c104bd928dcb";
			var comment = "This is the first comment";
			var author = "user";
			
			Comment.create("test", IDPost, comment, author, function(err, comments) {			
			
				chai.request(server)
				.get("/api/posts/" + comments._idPost + "/comments")
				.end(function(err, res) {
					res.should.have.status(200);
					//res.should.be.json;
					//res.body.should.be.a('array');
					//res.body.length.should.be.eql(0);
					done();
				});
				
			});
			
		});
	
	});
   
    /*
	 * test the POST route
	 */
	describe("POST new comment to spesific post", function() {
		
		// retrieve all comments of a spesific post
		it("it should GET all comments from the specified post", function(done) {
			
			// data for creating a new comment
			//var IDPost = "58e1f7e678b4c104bd928dcb";
			//var comment = "This is the first comment";
			//var author = "user";

			// url-encoded data for new comment
			var newComment = "comment=This is a new comment&author=User";

			//Comment.create("test", IDPost, comment, author, function(err, comments) {			
				
				chai.request(server)
					.post("/api/posts/" + "58e1f7e678b4c104bd928dcb" + "/comments/test")
					.send(newComment)
					.end(function(err, res) {
						res.should.have.status(200);
						//res.should.be.json;
						//res.body.should.be.a('array');
						//res.body.length.should.be.eql(0);
						done();
					});
				
			//});
			
		});
	
	});
   
});