import { User } from "../models/user-model.js";

// ****************** Home Logic ************************ //
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to home route of bookstore");
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

// ****************** Login Logic ************************ //

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      res.status(400).json("Invalid Credentials");
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        message: "User LoggedIn Successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
        isAdmin : userExist.isAdmin
      });
    } else {
      const status = 401;
      const message = "Fill the input properly";
      const extraDetails = "Invalid username or password";

      const error = {
        status,
        message,
        extraDetails,
      };
      //   res.status(401).json({ message: "Invalid username or password" });
      next(error);
    }
  } catch (error) {
    console.error("🔥 Error in login controller:", error);
    res.status(500).json("Internal Server Error");
  }
};

// ****************** Register Logic ************************ //

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const emailExists = await User.findOne({ email: email });

    if (!emailExists) {
      const userCreated = await User.create({
        username,
        email,
        phone,
        password,
      });
      res
        .status(201)
        .json({
          message: "User Created Successfully",
          token: await userCreated.generateToken(),
          userId: userCreated._id.toString(),
          isAdmin : userCreated.isAdmin
        });
    } else {
      res.status(400).json({ message: "Email Already Exists" });
    }
  } catch (error) {
    console.error("🔥 Error in register controller:", error);
    res.status(500).json("Internal Server Error");
  }
};

// ****************** User Logic ************************ //

const user = async (req,res)=> {
  try {

    const userData = req.user
    // console.log(userData);
    return res.status(200).json(userData)
    
  } catch (error) {
    console.log("error from the user route : ",error)
  }
}

// ****************** User update Logic ************************ //

const updateUserData = async (req,res) => {
  try {
    const userData = req.user;
    const newData = req.body;
    // console.log("userData console ",userData)
    // console.log(newData)
    const updatedData = await User.updateOne({_id: userData._id}, 
      {
        $set : newData,
      }
    )
    // console.log(updatedData);
    
    return res.status(200).json(updatedData)

  } catch (error) {
    console.log("error from the user updating route : ",error)
  }
}


export { home, login, register , user ,updateUserData};
