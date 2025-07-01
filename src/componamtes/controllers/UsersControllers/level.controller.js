const Level = require('../../models/UsersModels/level.model');

exports.getAllLevels = async (req, res) => {
 try {
  const levels = await Level.findAll({
   order: [['level', 'ASC']]
  });
  res.json(levels);
 } catch (error) {
  res.status(500).json({ error: 'Failed to fetch levels' });
 }
};