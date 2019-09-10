const routes = require('next-routes');

module.exports = routes()
  .add('portfolio', '/portfolio/:id')
  .add('portfolioEdit', '/portfolios/:id/edit')
  .add('blogEditorUpdate', '/blogs/:id/edit');

// https://github.com/fridays/next-routes
