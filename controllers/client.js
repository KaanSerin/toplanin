const axios = require('axios');

/**
 * @desc    Get Client Location Info
 * @route   GET /api/client/getInfo/:ip
 * @access  Public
 */
exports.getClientInfo = async (req, res) => {
  const { ip } = req.params;
  const { data } = await axios.get(`https://ipapi.co/${ip}/json/`);
  console.log(data);
  res.status(200).json({ success: true, data });
};
