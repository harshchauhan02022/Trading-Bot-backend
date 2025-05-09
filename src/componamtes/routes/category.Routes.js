const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");

router.post("/add", controller.addCategory);
router.get("/users", controller.getAllUsers);
router.get("/users/:amount", controller.getUsersByAmount);

module.exports = router;
