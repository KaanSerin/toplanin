const { validationResult } = require('express-validator');
const db = require('../config/db');
const moment = require('moment');

exports.createGroup = async (req, res) => {
  const { user_id } = req.user;
  let { location, topics, name, about, plan } = req.body;

  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    return res.status(400).json({ errors: errors.array() });
  }

  const points = location.split(',');
  location = `point(${points[0]} ${points[1]})`;

  try {
    const {
      rows,
    } = await db.query(
      'INSERT INTO groups(name, location, topics, about, plan, creator) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, location, topics, about, plan, user_id]
    );

    console.log(rows);
    res.status(201).json({ success: true, group: rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};
