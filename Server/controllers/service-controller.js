import { Service } from "../models/service-model.js";

// ****************** Service Logic ************************ //
const service = async (req, res) => {
  try {
    const { name, title, price, category, image } = req.body;
    let dataFilled = null;
    if (image) {
      dataFilled = await Service.create({
        name,
        title,
        price,
        category,
        image,
      });
    } else {
      dataFilled = await Service.create({ name, title, price, category });
    }
    if (dataFilled) {
      res.status(200).json({ message: "Service data Submitted Successfully" });
    } else {
      res.status(400).json({ message: "Service adding failed" });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// ****************** Fetching all Services Logic ************************ //
const fetchingServices = async (req,res) => {
  try {

    const servicesData = await Service.find()
    // console.log(servicesData); 
    if(servicesData){
      res.status(200).json(servicesData)
    }else{
      res.status(400).json({message: "Failed to fetch Data"})
    }
    
  } catch (error) {
    console.log("Error in Service Fetching",error);
    res.status(500).json("Internal Server Error")
    
  }
}

// ****************** Fetch Services by Id Logic ************************ //
const getServiceById = async (req,res) => {
  try {
    const id = req.params.id
    const serviceData = await Service.findOne({_id:id})
    if(serviceData){
      res.status(200).json(serviceData)
    }else{
      res.status(400).json({message: "Failed to fetch Service"})
    }
    
  } catch (error) {
    console.log("Error in Service Fetching",error);
    res.status(500).json("Internal Server Error")
    
  }
}

export { service,fetchingServices, getServiceById};
