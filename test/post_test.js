var Mongoose = require('mongoose').Mongoose;
var Post = require('../models/posts');
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

var postListResponse = {
    title: 'post schema GET all post',
    type: 'object',
    required: ['_data'],
    properties: {
        _data: {
            type: 'array',
            minItems: 0,
            uniqueItems: true,
                items: {
                type: 'object',
                required: ['_id', 'title', 'author','timestamp'],
                properties: {
                    _id : {
                        type: 'string'
                    },
                    title : {
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

var postGetResponse = {
    title: 'post schema GET post by id',
    type: 'object',
    required: ['_data'],
    properties: {
        _data: {
            type: 'array',
            minItems: 0,
            uniqueItems: true,
                items: {
                type: 'object',
                required: ['_id', 'title', 'content', 'author','timestamp'],
                properties: {
                    _id : {
                        type: 'string'
                    },
                    title : {
                        type: 'string'
                    },
                    content : {
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

var postPostResponse = {
    title: 'post schema POST',
    type: 'object',
    required: ['_data'],
    properties: {
        _data: {
            type: 'object',
            required: ['_id', 'title', 'content', 'author','timestamp'],
            properties: {
                _id : {
                    type: 'string'
                },
                title : {
                    type: 'string'
                },
                content : {
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


var postListModel = {
    title: 'post schema get all post model',
    type: 'array',
    minItems: 1,
    uniqueItems: true,
    items: {
        type: 'object',
        required: ['__v','_id', 'title', 'author', 'timestamp'],
        properties: {
            _id : {
                type: 'object'
            },
            title : {
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

var postCreateModel = {
    title: 'post schema create model',
    type: 'array',
    minItems: 1,
    uniqueItems: true,
    items: {
        type: 'object',
        required: ['__v','_id', 'title', 'content',  'author', 'timestamp'],
        properties: {
            _id : {
                type: 'object'
            },
            title : {
                type: 'string'
            },
            content : {
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



describe('Test on API Endpoint 1', () => {
    beforeEach((done) => { //Before each test we empty the database
        chai.request(server)
            .post('/api/posts')
            .type('form')
            .send('title=hello&content=helloworld&author=rudi')
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });  
    });

    it('Checking response for Post collection (GET /api/posts)', (done) => {
      chai.request(server)
          .get('/api/posts')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.jsonSchema(postListResponse);
            done();
          });
    });


});

describe('Test on API Endpoint 2', () => {
    it('Checking response for filled Post collection (GET /api/posts) ', (done) => { //Before each test we empty the database
        chai.request(server)
            .post('/api/posts')
            .type('form')
            .send('title=hello&content=helloworld&author=rudi')
            .end((err, res, postId) => {
                res.should.have.status(200);
                var postId = res.body._data._id;

                chai.request(server)
                    .get('/api/posts/'+postId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.jsonSchema(postGetResponse);
                    });
              done();
        	});
     });     

	

});


describe('Test on API Endpoint 3', () => {
	  it('Checking response for making post method (POST /api/posts)', (done) => {
	    chai.request(server)
          .post('/api/posts')
          .type('form')
          .send('title=hello&content=helloworld&author=rudi')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.jsonSchema(postPostResponse);
              done();
      	});
	  });
});

describe('Test on Model Post.list', () => {
    it('Checking Post.list function', (done) => {
        Post.list(function(err, posts){     
            posts.should.be.jsonSchema(postListModel);
        });
        done();
    });

});

describe('Test on Model Post.create', () => {
    it('Checking Post.create function', (done) => {
        Post.create('hello', 'hello world', 'rudi', function(err, posts){     
            posts.should.be.jsonSchema(postCreateModel);
        });
        done();
    });
});

describe('Test on Model Post.get', () => {
    it('Checking Post.get function', (done) => {
        Post.create('hello', 'hello world', 'rudi', function(err, posts){     
            Post.get(posts._id, function(err, posts){     
              posts.should.be.jsonSchema(postCreateModel);
            });
        });
        done();
    });
});