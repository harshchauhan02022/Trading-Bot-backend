const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const upload = require('../../middleware/upload');

// Register with file upload
router.post(
  '/users/register',
  upload.fields([
    { name: 'aadhar_front', maxCount: 1 },
    { name: 'aadhar_back', maxCount: 1 },
  ]),
  userController.createUser
);

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
