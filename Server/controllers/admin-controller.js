import { Contact } from "../models/contact-model.js";
import { Service } from "../models/service-model.js";
import { User } from "../models/user-model.js";
import { Sale } from "../models/sales-model.js";

// ****************** User Data Fetch Logic ************************ //

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await User.findOne({ _id: id }, { password: 0 });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

// ****************** Admin User update Logic ************************ //

const updateUserDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    // console.log(newData)
    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: newData,
      }
    );
    // console.log(updatedData);

    return res.status(200).json(updatedData);
  } catch (error) {
    console.log("error from the user updating route : ", error);
  }
};

// ****************** Delete user by Id Logic ************************ //

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// ****************** Users Fetch Logic ************************ //

const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find({}, { password: 0 });

    return res.status(200).json(Users);
  } catch (error) {
    next(error);
  }
};

// ****************** Contact Fetch Logic ************************ //

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

// ****************** Clear Contacts Logic ************************ //

const deleteAllContacts = async (req, res) => {
  try {
    await Contact.deleteMany({});
    return res.status(200).json({ message: "All Contacts Deleted" });
  } catch (error) {
    console.log(error);

    res.status(500).json("Internal Server Error");
  }
};

// ****************** Delete Contact by ID Logic ************************ //

const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfull" });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

// ****************** Services Fetch Logic ************************ //

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json(services);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

// ****************** Delete Service by ID Logic ************************ //

const deleteServiceById = async (req, res) => {
  try {
    const id = req.params.id;
    await Service.deleteOne({ _id: id });
    return res.status(200).json({ message: "Service Deleted Successfull" });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

// ****************** Delete Service by ID Logic ************************ //

const updateServiceById = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
   const updatedData = await Service.updateOne(
      { _id: id },
      {
        $set: newData,
      }
    );
    
    return res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

// ****************** Sales Fetch Logic ************************ //

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("user").populate("service");
    return res.status(200).json(sales);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export {
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUserDataById,
  getAllContacts,
  deleteAllContacts,
  deleteContactById,
  getAllServices,
  deleteServiceById,
  updateServiceById,
  getAllSales
};
