const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('../routes');

// SERVICES
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

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
  .connect(
    'mongodb://dan:Fuckyahoo667@ds213538.mlab.com:13538/portfolio-dan-dev',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

app
  .prepare()
  .then(() => {
    const server = express();

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

    server.use(handle).listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on localhost : 3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit();
  });
