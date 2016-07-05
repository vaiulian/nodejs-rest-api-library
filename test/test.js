process.env.NODE_ENV = 'test';

var chai = require('chai');
var mongoose = require('mongoose');
var chaiHttp = require('chai-http');
var server = require('../index');
var BookTest = require('../server/models/bookModel');
var should = chai.should();

chai.use(chaiHttp);

describe('Books', function() {

  beforeEach(function(done){

    var Book = new BookTest({
      title: 'Test Title',
      author: 'Test Author',
      year: 2000
    });
    Book.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    BookTest.collection.drop();
    done();
  });


  // it('should list ALL Books on /api/books GET');
  // it('should list a SINGLE Book on /api/books/<id> GET');
  // it('should add a SINGLE Book on /api/books POST');
  // it('should update a SINGLE book on /api/books/<id> PUT');
  // it('should delete a SINGLE book on /api/books/<id> DELETE');

  it('should list ALL Books on /api/books GET', function(done) {
    chai.request(server)
      .get('/api/books')
      .set('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NjgzMTQxODI4OTR9.As5SNiiE0nziV9JitXGDRf-DhF1sn08f8hdnoofiddU')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        done();
      });
  });

  it('should list a SINGLE Book on /api/books/<id> GET', function(done) {
    var Book = new BookTest({
      title: 'Single Test Title',
      author: 'Single Test Author',
      year: 2000
    });

    Book.save(function(err, data) {
      chai.request(server)
        .get('/api/books/'+data._id)
        .set('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NjgzMTQxODI4OTR9.As5SNiiE0nziV9JitXGDRf-DhF1sn08f8hdnoofiddU')
        .end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('title');
          res.body.should.have.property('author');
          res.body.title.should.equal('Single Test Title');
          res.body.year.should.equal(2000);
          res.body._id.should.equal(data.id);
          done();
        });
      });
  });

});
