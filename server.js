const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('bodyParser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

const blogPostRouter = require('./blogrouter');

app.use(morgan('common'));
app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
