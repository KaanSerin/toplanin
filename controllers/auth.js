const { validationResult } = require('express-validator');
/**
 * @desc    Register Uer
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = (req, res) => {
  const errors = validationResult(req);

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({ msg: 'HELLO THERE!' });
};
