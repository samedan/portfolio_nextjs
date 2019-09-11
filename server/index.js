const express = require('express');
const compression = require('compression');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('../routes');

// SERVICES
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require('./config');

const Book = require('./models/book');
const bodyParser = require('body-parser');

// ROUTES
const booksRoutes = require('./routes/book');
const portfolioRoutes = require('./routes/portfolio');
const blogRoutes = require('./routes/blog');

const secretData = [
  {
    title: 'Secret Data 1',
    description: 'Plans how to build spaceship'
  },
  {
    title: 'Secret Data 2',
    description: 'My secret passwords'
  }
];

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

// async () =>
//   (await mongoose.connect(config.DB_URI, { useNewUrlParser: true }))();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());
    server.use(bodyParser.json());
    server.use('/api/v1/books', booksRoutes);
    server.use('/api/v1/portfolios', portfolioRoutes);
    server.use('/api/v1/blogs', blogRoutes);

    // ENDPOINTS

    server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
      return res.json(secretData);
    });

    server.get(
      '/api/v1/onlysiteowner',
      authService.checkJWT,
      authService.checkRole('siteOwner'),
      (req, res) => {
        return res.json(secretData);
      }
    );

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.use(function(err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res
          .status(401)
          .send({ title: 'Unauthorized', detail: 'Unauthorized access' });
      }
    });

    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, err => {
      if (err) throw err;
      console.log('> Ready on port ' + PORT);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit();
  });
