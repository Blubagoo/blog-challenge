const express = require('express');
const router = express.Router();
const bodyParser = require('bodyParser');
const jsonParser = bodyParser.json();

const {BlogPost} = require('./models');

BlogPost.create("title":"Days Go By",
				"content": "things",
				"author": "Joe Schmo",
				"publishDate": "11/12/13");

router.get('/', (req,res) => {
	res.json(BlogPost.get());
});
router.post('/', jsonParser, (req, res) => {
	const requiredFields =  ["title", "content", "author", "publishDate"];
	for(i=0; i<requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
		const item = BlobPost.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
		return res.status(201).json(item);
	};
});

router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ["title", "content", "author", "publishDate"];
	for(i=0; i<requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in request body`;
			res.status(400).send(message);
		}
	}
	if(req.params.id !== req.body.id){
		const message = `Request path id (${req.params.id}) must match request body id(${req.body.id})`;
		res.status(400).send(messsage);
	}
	console.log(`updating blog with id ${req.body.id}`);
	BlogPost.update({
		"title": req.body.title,
		"content": req.body.content,
		"author": req.body.author,
		"publishDate": req.body.publishDate
	});
	res.status(204).end();
});

router.delete('/:id', (req, res) => {
	BlogPost.delete(require.params.id);
	console.log(`Deleted blog with id ${req.params.id}`);
	res.status(204).end();
});

module.exports = router;
