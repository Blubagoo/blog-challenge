const express = require('express');
const router = express.Router();

const {BlogPosts} = require('./models');
console.log('we are importing ', BlogPosts);

BlogPosts.create({title:"Days Go By",
				content: "things",
				author: "Joe Schmo",
				publishDate: "11/12/13"});

router.get('/', (req,res) => {
	res.json(BlogPosts.get());
});
router.post('/', (req, res) => {
	const requiredFields =  ["title", "content", "author", "publishDate"];
	console.log('req.body', req);
	for(let i=0; i<requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
		const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
		return res.status(201).json(item);
	};
});

router.put('/:id', (req, res) => {
	const requiredFields = ["title", "content", "author", "publishDate"];
	for(let i=0; i<requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in request body`;
			res.status(400).send(message);
		}
	}
	if(req.params.id !== req.body.id){
		const message = `Request path id (${req.params.id}) must match request body id(${req.body.id})`;
		res.status(400).send(message);
	}
	console.log(`updating blog with id ${req.body.id}`);
	BlogPosts.update({
		"title": req.body.title,
		"content": req.body.content,
		"author": req.body.author,
		"publishDate": req.body.publishDate
	});
	res.status(204).end();
});

router.delete('/:id', (req, res) => {
	BlogPosts.delete(require.params.id);
	console.log(`Deleted blog with id ${req.params.id}`);
	res.status(204).end();
});

module.exports = router;
