const database = require("../config/config");

exports.getExpenses = async (req, res) => {
  try {
    const snapshot = await database.ref("Expenses").once("value");
    const expenses = snapshot.val();
    if (!expenses) {
      return res.status(404).json({ message: "No expenses found" });
    }
    res.json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving expenses" });
  }
};

exports.getSingleExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await database.ref(`Expenses/${id}`).once("value");
    const expense = snapshot.val();
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving expense" });
  }
};

exports.postExpense = async (req, res) => {
  const {
    savings,
    payment_obligations,
    housing,
  } = req.body;

  // Validating the fields, ensuring all necessary data is present
  if (
    !savings ||
    !payment_obligations ||
    !housing ||
    !savings.rrsp ||
    !savings.investment_savings ||
    !savings.longterm_savings ||
    !savings.bonds ||
    !savings.others ||
    !payment_obligations.credit_card ||
    !payment_obligations.loan ||
    !payment_obligations.vehicle ||
    !payment_obligations.line_of_credit ||
    !housing.rent ||
    !housing.rent_insurance ||
    !housing.storage_and_parking ||
    !housing.utilities ||
    !housing.maintenance
  ) {
    return res.status(400).json({
      errorMessage: "Please enter all required fields for savings, payment obligations, and housing"
    });
  }

  const snapshot = await database.ref("Expenses").once("value");
  const data = snapshot.val();
  let count = data ? Object.keys(data).length : 0;

  const newExpense = {
    id: count + 1,
    savings,
    payment_obligations,
    housing,
  };

  await database.ref("Expenses").push(newExpense);
  res.status(201).json({ message: "A new expense was added", data: newExpense });
};

exports.putExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      savings,
      payment_obligations,
      housing,
    } = req.body;

    const reference = database.ref(`Expenses/${id}`);
    const snapshot = await reference.once("value");
    const expense = snapshot.val();

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    await reference.update({
      savings,
      payment_obligations,
      housing,
    });
    res.status(200).json({
      message: "Expense was updated successfully",
      expense: { id, savings, payment_obligations, housing },
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Error updating expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const reference = database.ref(`Expenses/${id}`);
    const snapshot = await reference.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Expense not found" });
    }

    await reference.remove();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Error deleting expense" });
  }
};
