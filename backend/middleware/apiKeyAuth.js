/**
 * Middleware to protect admin-only routes with a simple API key.
 * Clients must supply the key in the `x-api-key` request header.
 */
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Yetkisiz erişim. Geçerli bir API anahtarı gereklidir.',
    });
  }

  next();
};

module.exports = apiKeyAuth;
