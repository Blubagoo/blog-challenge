const express = require('express');
const morgan = require('morgan');

const router = express.Router();

const {BlogPosts} = require('./models');

const app = express();

const blogPostRouter = require('./blogrouter');

app.use(morgan('common'));
app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
