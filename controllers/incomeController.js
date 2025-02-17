const database = require("../config/config");

//get income from firebase and exporting so other files can use the function
exports.getIncome = async (req, res) => {
  try{
    //access the firebase income node and retrieves the values once
    const snapshot = await database.ref("Income").once("value");
    const income = snapshot.val();
    //check if it exisits, send an error if it doesnt
    if(!income){
      res.status(404).json({error: "no income found"});
    }
    //retrieves the all the data on the income node
    res.json(income);
  }
  //catches error from try
  catch(error){
    console.log(error)
    res.status(500).json({error: "Error retrieving income"});
  }
}

//get an single income based on the id provided
exports.getSingleIncome = async(req,res)=>{
  try{
    //get the id from the URL parameters
    const {id} = req.params;
    //using the id to find a single income
    const snapshot = await database.ref(`Income/${id}`).once("value");
    const income = snapshot.val();
    //check if it exisits
    if(!income){
      res.status(404).json({error: "no income found"});
    }
    //send a response using the id
    res.json(income);
  }
  //catches error from the try block
  catch(error){
    console.log(error)
    res.status(500).json({error: "Error retrieving income" });
  }
}

//adding new income to the income node on firebase
exports.postIncome = async (req, res) => {
  //getting the values from the request body
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
        error: "please enter interest, others, secondary_income, support_payment, wages"});
    }

    const snapshot = await database.ref("Income").once("value");
    const data = snapshot.val();
    //creating my id different from firebase
    let count = data? Object.keys(data).length:0;

    //new object to be added to income node
    const newIncome={
      id: count+1,
      interest, 
      others, 
      secondary_income, 
      support_payment, 
      wages
    };

    //adding new income
    await database.ref("Income").push(newIncome);
    res.status(201).json({ message: "A new Income was added", data: newIncome });
}


//updating an existing income by id
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
  //update based on user changes
  await reference.update({interest, others, secondary_income, support_payment, wages});
  res.status(200).json({message: "user was updated successfully", user: {id, interest, others, secondary_income, support_payment, wages }})

}
  
  catch (error) {
    console.error("Error updating income:", error);
    res.status(500).json({ error: "Error updating income" });
}
};



//deleting existing income based on id     
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

    