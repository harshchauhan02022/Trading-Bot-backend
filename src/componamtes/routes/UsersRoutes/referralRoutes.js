const express = require('express');
const router = express.Router();
const referralController = require('../../controllers/UsersControllers/rferral.controller');

router.get('/direct-refers/:userId', referralController.getDirectReferUserDetails);
router.get('/team-refers/:userId', referralController.getTeamReferUsers);
router.get('/levels/:userId', referralController.getTotalLevels);
router.get('/earnings/:userId', referralController.getTotalEarnings);
router.get('/team-detail/:userId', referralController.getTeamReferralDetails);
router.get('/users-with-referrer', referralController.getAllUsersWithReferrerDetails);

module.exports = router;
