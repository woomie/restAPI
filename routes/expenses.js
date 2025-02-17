const express = require("express");
const {getExpenses, getSingleExpense, postExpense, putExpense, deleteExpense}= require("../controllers/expensesController")
const router = express.Router();


router.get("/", getExpenses);
router.get("/:id", getSingleExpense);
router.post("/", postExpense);
router.put("/", putExpense);
router.delete("/", deleteExpense);
  
module.exports = router;
  