const database = require("../config/config");


//get all the user from firebase
exports.getUsers = async(req,res)=>{
  try{
    const snapshot = await database.ref("Users").once("value");
    const users = snapshot.val();
    if(!users){
      res.status(404).json({message: "no users found"});
    }
    res.json(users);
  }
  catch(error){
    console.log(error)
    res.status(500).json({error: "Error retrieving users" });
  }
}

//get a single user, using the unique id
exports.getSingleUser = async(req,res)=>{
  try{
    const {id} = req.params;
    const snapshot = await database.ref(`Users/${id}`).once("value");
    const user = snapshot.val();
    if(!user){
      res.status(404).json({message: "no user found"});
    }
    res.json(user);
  }
  catch(error){
    console.log(error)
    res.status(500).json({error: "Error retrieving user" });
  }
}

//allows new users to be added
exports.postUser = async (req, res) => {
    //res.send("data loading...")
    const{name, username, email, address} = req.body;
    
    //validating the field, also letting users know what data to enter
    if(
      !name ||
      !username ||
      !email ||
      !address ||
      !address.city ||
      !address.street ||
      !address. suite ||
      !address. zipcode
    ){
      res.status(404).json({
        errorMessage: "please enter Name, Username, email and Address (City, Street, Suite, Zipcode"});
    }

    const snapshot = await database.ref("Users").once("value");
    const data = snapshot.val();
    let count = data? Object.keys(data).length:0;


    const newUser={
      id: count+1,
      name,
      username,
      email,
      address
    }

    await database.ref("Users").push(newUser);
    res.status(201).json({ message: "A new user was added", data: newUser });
  }
//allows users to be updated
  exports.putUser = async (req, res) => {
    //res.send("data loading...")
    try{
      const{id} = req.params;
    const{name, username, email, address} = req.body;
  

    //find the user by the id
    const reference = database.ref(`Users/${id}`)
    const snapshot = await reference.once("value");
    const users = snapshot.val();

    if(!users){
      return res.status(404).json({error: "user not found"});
    }

    await reference.update({name, username, email, address});
    res.json({message: "user was updated successfully", user: {id, name, username, email, address }})

  }
    
    catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
  }
  };


  
  exports.deleteUser = async (req, res) => {
    //res.send("data loading...")
    const {id} = req.params;
    const reference = database.ref(`Users/${id}`)
    const snapshot = await reference.once("value");
    const user = snapshot.val();

    if(!user){
      return res.status(404).json({error: "user not found"});
    }

    await reference.remove();
    res.json({message: "user was deleted successfully", data: user});



  }