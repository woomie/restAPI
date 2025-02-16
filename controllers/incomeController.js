const database = require("../config/config");


exports.getIncome = async (req, res) => {
  try{
    const snapshot = await database.ref("Income").once("value");
    const income = snapshot.val();
    if(!income){
      res.status(404).json({message: "no income found"});
    }
    res.json(income);
  }
  catch(error){
    console.log(error)
    res.status(500).json({error: "Error retrieving income"});
  }
}

exports.getSingleIncome = async(req,res)=>{
  try{
    const {id} = req.params;
    const snapshot = await database.ref(`Income/${id}`).once("value");
    const income = snapshot.val();
    if(!income){
      res.status(404).json({message: "no income found"});
    }
    res.json(income);
  }
  catch(error){
    console.log(error)
    res.status(500).json({error: "Error retrieving income" });
  }
}

exports.postIncome = async (req, res) => {
  const{interest, others, secondary_income, support_payment, wages} = req.body;
    
    //validating the field, also letting users know what data to enter
    if(
      !interest ||
      !others ||
      !secondary_income ||
      !support_payment ||
      ! wages 
    ){
      return res.status(404).json({
        errorMessage: "please enter interest, others, secondary_income, support_payment, wages"});
    }

    const snapshot = await database.ref("Income").once("value");
    const data = snapshot.val();
    let count = data? Object.keys(data).length:0;


    const newIncome={
      id: count+1,
      interest, 
      others, 
      secondary_income, 
      support_payment, 
      wages
    };

    await database.ref("Income").push(newIncome);
    res.status(201).json({ message: "A new Income was added", data: newIncome });
}
    
exports.putIncome = async (req, res) => {
  try{
    const{id} = req.params;
    const{interest, others, secondary_income, support_payment, wages} = req.body;


  //find the user by the id
  const reference = database.ref(`Income/${id}`)
  const snapshot = await reference.once("value");
  const income = snapshot.val();

  if(!income){
    return res.status(404).json({error: "income not found"});
  }

  await reference.update({interest, others, secondary_income, support_payment, wages});
  res.status(200).json({message: "user was updated successfully", user: {id, interest, others, secondary_income, support_payment, wages }})

}
  
  catch (error) {
    console.error("Error updating income:", error);
    res.status(500).json({ error: "Error updating income" });
}
};



      
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const reference = database.ref(`Income/${id}`);
    const snapshot = await reference.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Income not found" });
    }

    await reference.remove();
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ error: "Error deleting income" });
  }
};

    