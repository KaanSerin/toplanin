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

    const data = await db.query(
      'INSERT INTO group_members VALUES($1, $2, $3)',
      [rows[0].group_id, user_id, 'Organizer']
    );

    res.status(201).json({ success: true, group: rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM groups');

    return res.status(200).json({ groups: rows });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

exports.getPopularGroups = async (req, res) => {
  try {
    const { rows } = await db.query(`
    WITH group_member_counts AS (
      SELECT group_id, COUNT(user_id) as no_of_members FROM group_members GROUP BY group_id  LIMIT 9
    )
    SELECT groups.group_id, groups.name, users.name as creator, groups.about, group_member_counts.no_of_members, groups.public
    FROM groups, users, group_member_counts WHERE groups.group_id = group_member_counts.group_id AND groups.creator = users.user_id;
  `);

    return res.status(200).json({ groups: rows });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
