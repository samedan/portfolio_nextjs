const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio');
const authService = require('../services/auth');

// ADD/POST a book
router.post(
  '',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioController.savePortfolio
);
// GET All Portfolios
router.get(
  '',

  portfolioController.getPortfolios
);

// GET Portfolio by ID
router.get('/:id', portfolioController.getPortfolioById);

// PATCH Portfolio
router.patch(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioController.updatePortfolio
);
// DELETE Portfolio
router.delete(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioController.deletePortfolio
);

module.exports = router;
