import { Contact } from "../models/contact-model.js";

// ****************** Contact form Logic ************************ //
const contactForm = async (req, res) => {
  try {
    const {username,email,message} = req.body
    const dataFilled = await Contact.create({username,email,message})
    if(dataFilled){
        res.status(200).json({message: "Form Submitted Successfully"})
    }else{
        res.status(400).json({message: "Form Submission failed"})
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({message: "Internal Server Error"})
  }
};

export {contactForm}