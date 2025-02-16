const express = require("express");
const {getUsers,getSingleUser, postUser, putUser, deleteUser} = require("../controllers/userController");
const router = express.Router();


router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);


module.exports = router;
