const db = require('../config/db');
const { validationResult } = require('express-validator');
const { query } = require('../config/db');

/**
 * @ToDo  Format response event date/time and location information
 * @Date  moment('2021-01-01T22:00:00.000Z').format('dddd, MMMM D, YYYY, hh:mm A Z');
 * @Location
 */

/**
 * @desc    Get Events
 * @route   GET /api/events
 * @access  Public
 */
exports.getEvents = async (req, res) => {
  // Setting up the query
  let queryText = `WITH event_attendances AS (
    SELECT event_id, COUNT(user_id) as attendees 
    FROM event_attendees
    GROUP BY event_id
    )
    SELECT events.event_id, events.name as event_name, events.group_id, groups.name as group_name,
    events.details, events.date as date, events.location, events.online, event_attendances.attendees
    FROM events
    JOIN groups ON events.group_id = groups.group_id
    JOIN event_attendances ON events.event_id = event_attendances.event_id`;
  let queryParams = [];

  const { long, lat, limit } = req.query;

  // If long and lattitude are provided
  if (long && lat) {
    queryText += ' WHERE events.location = ST_MakePoint($1, $2)';
    queryParams.push(long, lat);
  }
  // PGSQL Limit null === No limit
  if (limit) {
    queryText += ' LIMIT $3;';
    queryParams.push(limit);
  }

  try {
    const { rows } = await db.query(queryText, queryParams);

    res.status(200).json({ success: true, events: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

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

/**
 * @desc    Get Event Subcategories
 * @route   GET /api/events/subcategories
 * @access  Public
 */
exports.getEventSubcategories = async (req, res) => {
  const errors = validationResult(req);

  if (errors.errors.length > 0) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { interests } = req.body;

  // Make this a parametrised query later...
  try {
    const { rows } = await db.query(
      `SELECT * FROM event_subcategories WHERE category_id IN(${interests}) `
    );

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
