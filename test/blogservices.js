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

describe("Posts", () => {
    
	Post.collection.drop();
	
	beforeEach(function(done){
		var newPost = new Post({
			_id: ObjectId("58e1f7e678b4c104bd928dcb"),
			title: req.body.title,
			content: req.body.content,
			author: req.body.author,
			timestamp: ISODate("2017-04-02T09:37:34.002Z")
		});
		newPost.save(function(err) {
			done();
		});
	});
	
	afterEach(function(done){
		Post.collection.drop();
		done();
	});

	
	/*
	 * Test the GET route
	 */
	 describe("GET all posts", function() {
		it("it should GET all the posts", function(done) {
			chai.request(server)
			.get("/api/posts")
			.end(function(err, res) {
				res.should.have.status(200);
				//res.body.should.be.a('array');
				//res.body.length.should.be.eql(0);
				done();
			});
		});
		
		it("it should GET a post having the specified ID", function(done) {
			chai.request(server)
			.get("/api/posts")
			.end(function(err, res) {
				res.should.have.status(200);
				//res.body.should.be.a('array');
				//res.body.length.should.be.eql(0);
				done();
			});
		});
	});

});