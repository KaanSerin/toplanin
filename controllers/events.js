const db = require('../config/db');

/**
 * @desc    Get Event Categories
 * @route   GET /api/events/eventcategories
 * @access  Public
 */
exports.getEventCategories = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM event_categories');

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
