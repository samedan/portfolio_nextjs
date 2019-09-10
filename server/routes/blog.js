const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const authService = require('../services/auth');

// GET all Blogs
router.get('', blogController.getBlogs);

// GET my blogs
router.get(
  '/me',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.getUserBlogs
);

// // GET blog by ID
router.get('/:id', blogController.getBlogById);

// GET blog by SLUG
router.get('/s/:slug', blogController.getBlogBySlug);

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

// DELETE a blog
router.delete(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.deleteBlog
);

module.exports = router;
