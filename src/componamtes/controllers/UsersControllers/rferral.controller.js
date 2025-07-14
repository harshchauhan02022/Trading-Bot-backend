const User = require('../../models/UsersModels/user.model');
const ReferralEarning = require('../../models/UsersModels/referral.model');

// 1. Direct Refer Users Count
exports.getDirectReferUserDetails = async (req, res) => {
 try {
  const userId = req.params.userId;

  // Find the root user
  const rootUser = await User.findByPk(userId);
  if (!rootUser) {
   return res.status(404).json({ message: 'User not found' });
  }

  // Find all direct users who were referred by this user
  const directUsers = await User.findAll({
   where: { refer_by: rootUser.refer_id },
   attributes: [
    'id',
    'full_name',
    'registration_date',
    'created_at',
    'refer_by',
    'refer_id'
   ]
  });

  const userList = directUsers.map((user, index) => ({
   sno: index + 1,
   name: user.full_name,
   registration_date: user.registration_date,
   activation_date: user.created_at,
   refer_by: user.refer_by,
   refer_id: user.refer_id
  }));

  res.json({
   directReferUsers: directUsers.length,
   users: userList
  });
 } catch (err) {
  res.status(500).json({ message: 'Error fetching direct refer users', error: err.message });
 }
};

exports.getTeamReferUsers = async (req, res) => {
 try {
  const userId = req.params.userId;
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const allUsers = await User.findAll();
  let count = 0;

  const findTeam = (referId) => {
   const referred = allUsers.filter(u => u.refer_by === referId);
   count += referred.length;
   referred.forEach(u => findTeam(u.refer_id));
  };

  findTeam(user.refer_id);
  res.json({ teamUsers: count });
 } catch (err) {
  res.status(500).json({ message: 'Error fetching team refer users', error: err.message });
 }
};

exports.getTotalLevels = async (req, res) => {
 try {
  const userId = req.params.userId;
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const allUsers = await User.findAll();
  let maxLevel = 0;

  const findLevel = (referId, level) => {
   const referred = allUsers.filter(u => u.refer_by === referId);
   if (referred.length > 0) maxLevel = Math.max(maxLevel, level);
   referred.forEach(u => findLevel(u.refer_id, level + 1));
  };

  findLevel(user.refer_id, 1);
  res.json({ totalLevels: maxLevel });
 } catch (err) {
  res.status(500).json({ message: 'Error fetching total levels', error: err.message });
 }
};

// 4. Total Referral Earnings
exports.getTotalEarnings = async (req, res) => {
 try {
  const userId = req.params.userId;

  const total = await ReferralEarning.sum('amount', {
   where: { user_id: userId }
  });

  res.json({ totalEarnings: total || 0 });
 } catch (err) {
  res.status(500).json({ message: 'Error fetching earnings', error: err.message });
 }
};

exports.getTeamReferralDetails = async (req, res) => {
 try {
  const userId = req.params.userId;
  const rootUser = await User.findByPk(userId);
  if (!rootUser) return res.status(404).json({ message: 'User not found' });

  const allUsers = await User.findAll();
  const allEarnings = await ReferralEarning.findAll();
  const teamDetails = [];

  const findTeam = (referId, level = 1) => {
   const referred = allUsers.filter(u => u.refer_by === referId);

   referred.forEach(user => {
    const earning = allEarnings.find(e =>
     e.user_id === parseInt(userId) &&
     e.from_user_id === user.id &&
     e.level === level
    );

    teamDetails.push({
     name: user.full_name,
     registration_date: user.registration_date,
     activation_date: user.activation_date,
     refer_by: user.refer_by,
     refer_id: user.refer_id,
     level,
     earning: earning ? earning.amount : 0
    });

    findTeam(user.refer_id, level + 1);
   });
  };

  findTeam(rootUser.refer_id);
  res.json({ team: teamDetails });
 } catch (err) {
  res.status(500).json({ message: 'Error fetching team details', error: err.message });
 }
};
exports.getAllUsersWithReferrerDetails = async (req, res) => {
 try {
  const users = await User.findAll({
   attributes: ['id', 'full_name', 'refer_id', 'refer_by'],
   include: [{
    model: User,
    as: 'referrer',
    attributes: ['id', 'full_name'] 
   }]
  });

  res.json({
   success: true,
   users
  });
 } catch (err) {
  res.status(500).json({ message: 'Error fetching user referrals', error: err.message });
 }
};

