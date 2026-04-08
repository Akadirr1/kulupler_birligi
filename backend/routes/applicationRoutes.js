const express = require('express');
const router = express.Router();

const { submitApplication, getApplications } = require('../controllers/applicationController');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// Public: Submit a new application
router.post('/', submitApplication);

// Admin: Get all applications (protected by API key)
router.get('/', apiKeyAuth, getApplications);

module.exports = router;
