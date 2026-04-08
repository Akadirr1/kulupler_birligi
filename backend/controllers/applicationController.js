const Application = require('../models/Application');

/**
 * @desc    Submit a new club application
 * @route   POST /api/applications
 * @access  Public
 */
const submitApplication = async (req, res, next) => {
  try {
    const application = await Application.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.',
      data: application,
    });
  } catch (error) {
    // Handle Mongoose validation errors gracefully
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    // Handle duplicate email if needed
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Bu e-posta adresi ile daha önce başvuru yapılmış.',
      });
    }

    next(error);
  }
};

/**
 * @desc    Get all club applications (admin only)
 * @route   GET /api/applications
 * @access  Admin (API Key protected)
 */
const getApplications = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      filter.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [applications, total] = await Promise.all([
      Application.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Application.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitApplication, getApplications };
