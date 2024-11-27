const express = require('express');
const router = express.Router();
const UserController = require('../../controller/usersController/UserController');

router.get("/", UserController.getAllUsers);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.delete("/delete/:id", UserController.deleteUser);
router.put("/edit", UserController.editUser); 

module.exports = router;
