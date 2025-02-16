const express = require("express");
const {getIncome, getSingleIncome, postIncome, putIncome,deleteIncome } = require("../controllers/incomeController")
const router = express.Router();


router.get("/", getIncome);
router.get("/:id", getSingleIncome),
router.post("/", postIncome);
router.put("/:id", putIncome);
router.delete("/:id", deleteIncome);

module.exports = router;
    
  
  