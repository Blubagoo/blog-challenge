const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;

const {app, runServer, closeServer} = require('../server');

chai.use(chaiHTTP);

describe('Blog-Posts', function() {

	before(function() {
		return runServer();
	
	});

	after(function() {
		return closeServer();

	});

	it('Should list posts on GET', function() {
	
		return chai.request(app)
			.get('/blog-posts')
			.send(newPost)
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.length).to.be.at.least(1);
				expect(res.body).to.be.a('array');
				const expectedKeys = ['title', 'content', 'author', 'publishDate'];
				res.body.for.Each(function(item) {
					expect(item).to.be.a('object');
					expect(item).to.include.keys(expectedKeys);
				});
			});
	});
	it('should create a new blog post on POST', function() {
		const newPost = {
			"title": "days go by",
			"content": "words of clihe",
			"author": "John Bodega"
		};
	
		return chai.request(app)
			.post('/blog-posts')
			.then(function(res) {
				expect(res).to.have.status(201);
				expect(res).to.be.json;
				expect(res.body).to.be.a('object');
				expect(res.body).to.include.keys('title','content','author','publishDate');
				expect(res.body.id).to.not.equal(null);
				expect(res.body).to.deep.equal(Object.assign(newPost, {id: res.body.id}));
			});
	});
	
	it('should modify existing blog-post on PUT', function() {

		const updatedPostData = {
			"title": "days go by",
			"content": "words of cliche",
			"author": "John Bodega"
		};

		return chai.request(app)
			.get('/blog-posts')
			.then(function(res) {
				updatedPostData.id = res.body[0].id;

				return chai.request(app)
				.put(`/blog-posts/${updatedPostData.id}`)
				.send(updatedPostData);
			})
			.then(function(res) {
				expect(res).to.have.status(204);
			});

	});

	it('Should delete posts on DELETE', function() {
		return chai.request(app)
			.get('/blog-posts')
			.then(function(res) {
				return chai.request(app)
					.delete(`/blog-posts/${res.body[0].id}`);

			})
			.then(function(res) {
				expect(res).to.have.status(204);
			});
	});




};
















