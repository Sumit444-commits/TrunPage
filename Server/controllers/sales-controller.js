import { Sale } from "../models/sales-model.js";
import { Service } from "../models/service-model.js";
import { User } from "../models/user-model.js";

// ****************** Create New Sale Object Logic ************************ //
const buyService = async (req, res) => {
  try {
    const userId = req.params.userId;
    const serviceId = req.params.serviceId;
    const price = await Service.findOne({ _id: serviceId }).select({
      price: 1,
    });
    const { email, status, receipt } = req.body;
    const { reason } = req.body;
   
      const sale = new Sale({
        email: email,
        status: status,
        reason: reason,
        price: price.price,
        receipt: receipt,
        user: userId,
        service: serviceId,
      });
      await sale.save();

      await User.findByIdAndUpdate(userId, { $push: { sales: sale._id } });

    res.status(200).json({ message: "Sale created successfully" });
  } catch (error) {
    console.log("sales error", error);
    res.status(500).json("Internal Server Error");
  }
};

// ****************** Sales Fetch By Id Logic ************************ //
const getSalesById = async (req, res) => {
  try {
    const id = req.params.id;

    const sale = await Sale.findOne({ _id: id })
      .populate("user")
      .populate("service");

    res.status(200).json(sale);
  } catch (error) {
    console.log("sales error", error);
    res.status(500).json("Internal Server Error");
  }
};

// ****************** Update Sale By Id Logic ************************ //
const updateSaleById = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    await Sale.updateOne(
      { _id: id },
      {
        $set: newData,
      }
    );

    res.status(200).json({ message: "Sale Data Updated." });
  } catch (error) {
    console.log("sales error", error);
    res.status(500).json("Internal Server Error");
  }
};



export { buyService, getSalesById, updateSaleById };
