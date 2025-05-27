const express = require('express');
const router = express.Router();
const userController = require('../../controllers/UsersControllers/user.controller');
const levelController = require('../../controllers/UsersControllers/level.controller');
const referralController = require('../../controllers/UsersControllers/rferral.controller');
const trackHistoryController = require('../../controllers/UsersControllers/trackHistory.controller');
const authenticate = require('../../utils/authMiddleware')
const upload = require('../../../middleware/upload');

router.post(
  '/users/register',
  upload.fields([
    { name: 'aadhar_front', maxCount: 1 },
    { name: 'aadhar_back', maxCount: 1 }
  ]),
  userController.createUser
);

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.get('/users/refer-details/:id', referralController.getReferDetails);

// router.get('/users/awaiting-approval', userController.getAwaitingApproval);
// router.put('/users/approve/:id', userController.approveUser);

router.get('/users/trade-history/:id', trackHistoryController.getTradeHistoryByCategory);

router.get('/levels', levelController.getAllLevels);
// router.get('/order', authenticate, OrderController.getUserOrders);
module.exports = router;
