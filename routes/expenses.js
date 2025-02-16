const express = require("express");
const {getExpenses, postExpense, putExpense, deleteExpense}= require("../controllers/expensesController")
const router = express.Router();


router.get("/", getExpenses);
router.post("/", postExpense);
router.put("/", putExpense);
router.delete("/", deleteExpense);
  
  module.exports = router;
  