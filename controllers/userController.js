const database = require("../config/config");


//get all the user from firebase and use exports so the function is available to other files
exports.getUsers = async(req,res)=>{
  try{
    //gets the data once as a snapshot from firebase
    const snapshot = await database.ref("Users").once("value");
    const users = snapshot.val();
    //checking if the users exist
    if(!users){
      res.status(404).json({error: "no users found"});
    }
    //sending the response back to the client
    res.json(users);
  }
  //catching errors in the try block
  catch(error){
    res.status(500).json({error: "Error retrieving users" });
  }
}

//get a single user, using the unique id
exports.getSingleUser = async(req,res)=>{
  try{
    //getting the id from the url parameters
    const {id} = req.params;
    //using the id to get a single user from firebase
    const snapshot = await database.ref(`Users/${id}`).once("value");
    const user = snapshot.val();
    //checking if the user exists
    if(!user){
      res.status(404).json({error: "no user found"});
    }
    //sending the response back
    res.json(user);
  }
  //catching errors from the try block
  catch(error){
    res.status(500).json({error: "Error retrieving user" });
  }
}

//allows new users to be added
exports.postUser = async (req, res) => {
  //extracting the values from the request body
    const{name, username, email, address} = req.body;
    
    //validating the field, also letting users know what data to enter
    if(
      !name ||
      !username ||
      !email ||
      !address ||
      !address.city ||
      !address.street ||
      !address.suite ||
      !address.zipcode
    ){
      //sending a descriptive error message with the contents users must have in the post body
      res.status(404).json({
        error: "please enter Name, Username, email and Address (City, Street, Suite, Zipcode"});
    }

    const snapshot = await database.ref("Users").once("value");
    const data = snapshot.val();
    //creating an id seperate from firebase
    let count = data? Object.keys(data).length:0;

    //creating a new user object
    const newUser={
      id: count+1,
      name,
      username,
      email,
      address
    }
    //adding it to the database
    await database.ref("Users").push(newUser);
    res.status(201).json({ message: "A new user was added", data: newUser });
  }


//allows exisiting users to be updated
  exports.putUser = async (req, res) => {
  
    try{
      //getting the id from the request paramaeters
      const{id} = req.params;
      const{name, username, email, address} = req.body;
  

    //find the user by the id
    const reference = database.ref(`Users/${id}`)
    const snapshot = await reference.once("value");
    const users = snapshot.val();

    if(!users){
      return res.status(404).json({error: "user not found"});
    }
    //updating the user
    await reference.update({name, username, email, address});
    res.json({message: "user was updated successfully", user: {id, name, username, email, address }})

  }
    
    catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
  }
  };


  //delete a user by the id
  exports.deleteUser = async (req, res) => {
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