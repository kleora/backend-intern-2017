let mongoose = require("mongoose");
let Post = require('../models/posts');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);
//Our parent block
describe('Posts', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     Post.remove({}, (err) => {
    //        done();
    //     });
    // });

//Testing /POST
    describe('/GET post', () => {
     it('Akan mengeluarkan semua data di collection post', (done) => {
       chai.request(server)
           .get('/api/posts')
           .end((err, res) => {
              expect(res.body).to.have.property('_data');
              expect(res.body._data).to.be.a('array');
             done();
           });
     });
    });

//Testing /POST :id
    describe('/GET post', () => {
     it('Akan mengeluarkan  data di collection post dengan ID', (done) => {
       chai.request(server)
           .get('/api/posts/58f1fe2479e8c9210062e21c')
           .end((err, res) => {
              expect(res.body).to.have.property('_data');
              expect(res.body._data).to.be.a('object');
             done();
           });
     });
    });

    //Testing /GET post
        describe('/GET post', () => {
         it('Akan mengeluarkan  data di collection post dengan ID', (done) => {
           chai.request(server)
               .get('/api/posts/58f1fe2479e8c9210062e21c')
               .end((err, res) => {
                  expect(res.body).to.have.property('_data');
                  expect(res.body._data).to.be.a('object');
                 done();
               });
         });
        });
  // Testing /POST post
    describe('/POST post', () =>{
      it('Akan mengeluarkan data bari di collection post', (done) =>{
        chai.request(server)
            .post("/api/posts")
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({title: 'test', content: 'test', author: 'test'})
            .end(function(error, res, body) {
              expect(res.body).to.have.property('_data');
              expect(res.body._data).to.be.a('object');
              done();
            });
      })
    })

});
