// src/components/controllers/UsersControllers/referral.controller.js
const User = require('../../models/UsersModels/user.model');
const Referral = require('../../models/UsersModels/referral.model');

exports.getReferDetails = async (req, res) => {
 try {
  const userId = req.params.id;

  const user = await User.findByPk(userId, {
   attributes: ['id', 'full_name', 'refer_id', 'refer_by', 'direct_earning', 'team_earning', 'team_count'],
  });

  if (!user) {
   return res.status(404).json({ error: 'User not found' });
  }

  const referrals = await Referral.findAll({
   where: { referrer_id: userId },
   include: [{
    model: User,
    as: 'ReferredUser',
    attributes: ['id', 'full_name', 'registration_date'],
   }],
  });

  res.json({
   userDetails: user,
   referredUsers: referrals.map(ref => ({
    ...ref.toJSON(),
    ReferredUser: ref.ReferredUser,
   })),
  });
 } catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Failed to fetch referral details' });
 }
};
