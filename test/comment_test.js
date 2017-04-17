var Mongoose = require('mongoose').Mongoose;
var Post = require('../models/posts');
var Comment = require('../models/comments');
var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiJsonSchema = require('chai-json-schema');
var server = require('../app');
var should = chai.should();
var mongoose = new Mongoose();
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);


mongoose.Promise = global.Promise;
chai.use(chaiHttp);
chai.use(chaiJsonSchema);

/*before(function(done) {
    mockgoose.prepareStorage().then(function() {
        mongoose.connect('mongodb://localhost:27017/TestingDB', function(err) {
            done(err);
        });
    });
});
*/

var commentsGetResponse = {
    title: 'comment schema GET',
    type: 'object',
    required: ['_data'],
    properties: {
        _data: {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
                items: {
                type: 'object',
                required: ['_id', 'comment', 'author', 'timestamp'],
                properties: {
                    _id : {
                        type: 'string'
                    },
                    comment : {
                        type: 'string'
                    },
                    author : {
                        type : 'string'
                    },
                    timestamp: {
                        type : 'string'
                    }
                }
            }
        }
    }
};

var commentsPostResponse = {
    title: 'comment schema POST',
    type: 'object',
    required: ['_data'],
    properties: {
        _data: {
            type: 'object',
            required: ['_id', 'comment', 'author', 'timestamp'],
            properties: {
                _id : {
                    type: 'string'
                },
                comment : {
                    type: 'string'
                },
                author : {
                    type : 'string'
                },
                timestamp: {
                    type : 'string'
                }
            }
        }
    }
};

var commentsCreateModel = {
    title: 'comment schema create model',
    type: 'object',
    required: ['__v' ,'_id', 'postId', 'comment', 'author', 'timestamp'],
    properties: {
        _id : {
            type: 'object'
        },
        postId : {
            type: 'string'
        },
        comment : {
            type: 'string'
        },
        author : {
            type : 'string'
        },
        timestamp: {
            type : 'object'
        },
        __v : {
            type : 'number'
        }
    }
};

var commentsGetModel = {
    title: 'comment schema get model',
    type: 'array',
    minItems: 1,
    uniqueItems: true,
    items: {
        type: 'object',
        required: ['__v','_id', 'postId',  'comment', 'author', 'timestamp'],
        properties: {
            _id : {
                type: 'object'
            },
            postId : {
                type: 'string'
            },
            comment : {
                type: 'string'
            },
            author : {
                type : 'string'
            },
            timestamp: {
                type : 'object'
            },
             __v : {
                type : 'number'
            }
        }
    }
};




describe('Test on API Endpoint 4', () => {
    it('Checking response for ', (done) => { //Before each test we empty the database
        chai.request(server)
            .post('/api/posts')
            .type('form')
            .send('title=hello&content=helloworld&author=rudi')
            .end((err, res, postId) => {
                res.should.have.status(200);
                var postId = res.body._data._id;
            
            chai.request(server)
                .post('/api/posts/'+postId+'/comments')
                .type('form')
                .send('author=hello&comment=helloworld')
                .end((err, res) => {
                    res.should.have.status(200);
                });

            chai.request(server)
                .get('/api/posts/'+postId+'/comments')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.jsonSchema(commentsGetResponse);
                    done();
                });
            });
     });     
});

describe('Test on API Endpoint 5', () => {
    it('it should return the posts with id and timestamp', (done) => { //Before each test we empty the database
        chai.request(server)
            .post('/api/posts')
            .type('form')
            .send('title=hello&content=helloworld&author=rudi')
            .end((err, res, postId) => {
                res.should.have.status(200);
                var postId = res.body._data._id;
            
            chai.request(server)
                .post('/api/posts/'+postId+'/comments')
                .type('form')
                .send('author=hello&comment=helloworld')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.jsonSchema(commentsPostResponse);
                    done();
                });
        	});
     });     
});

describe('Test on Model Commment.create', () => {
    it('Checking Comment.create function', (done) => {
        Post.create('hello', 'hello world', 'rudi', function(err, posts){     
            Comment.create(posts._id, 'rudi', 'halo juga', function(err, comment) {
                comment.should.be.jsonSchema(commentsCreateModel);
                done();
            });
        });
    });
});


describe('Test on Model Commment.get', () => {
    it('Checking Comment.get function', (done) => {
        Post.create('hello', 'hello world', 'rudi', function(err, posts){     
            Comment.create(posts._id, 'rudi', 'halo juga', function(err, comment) {
                Comment.get(posts._id, function(err,comments) {
                    comments.should.be.jsonSchema(commentsGetModel);
                    done();
                });
            });
        });
    });
});