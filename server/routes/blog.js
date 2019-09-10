const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const authService = require('../services/auth');

// Get my blogs
router.get(
  '/me',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.getUserBlogs
);

// GET a book
router.get('/:id', blogController.getBlogById);

// ADD/POST a book
router.post(
  '',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.createBlog
);

// PATCH a blog
// ADD/POST a book
router.patch(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.updateBlog
);

module.exports = router;
