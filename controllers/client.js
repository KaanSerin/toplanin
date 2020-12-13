const axios = require('axios');

exports.getClientInfo = async (req, res) => {
  const { ip } = req.params;
  const { data } = await axios.get(`https://ipapi.co/${ip}/json/`);
  console.log(data);
  res.status(200).json({ success: true, data });
};
