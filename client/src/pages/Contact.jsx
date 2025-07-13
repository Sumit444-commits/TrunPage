import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import InputField from "../components/UI/InputField";
import TextareaField from "../components/UI/TextareaField";
import { useStore } from "../store/AppContext";

const defaultContactForm = {
  username: "",
  email: "",
  message: "",
};

const Contact = () => {
  const { Api, user } = useStore();
  const [contact, setContact] = useState(defaultContactForm);

  const [userData, setUserData] = useState(true);

  
  if (user && userData) {
    setContact({ username: user.username, email: user.email, message: "" });
    setUserData(false);
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${Api}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Form Submitted Successfully");
        setContact(defaultContactForm);
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Contact form: ", error);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-700">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            We’d love to hear from you. Fill out the form below and we’ll
            respond shortly.
          </p>
        </div>

        {/* Grid: Image + Form */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div>
            <img
              src="/images/contact.jpg"
              alt="Contact support"
              className="rounded-xl shadow-md w-full max-w-md mx-auto"
            />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-xl shadow-md"
          >
            <InputField
              label="Username"
              name="username"
              value={contact.username ?? ""}
              onChange={handleInput}
              required
              placeholder="Your full name"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={contact.email ?? ""}
              onChange={handleInput}
              required
              placeholder="you@example.com"
            />

            <TextareaField
              label="Message"
              name="message"
              value={contact.message ?? ""}
              onChange={handleInput}
              required
              placeholder="Write your message here..."
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 rounded-md hover:bg-indigo-700 transition font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1099.3786472941736!2d68.31364181798044!3d25.40098949597281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c79820d34a7b1%3A0x996c6ec151758d76!2sClick%20Enterprises!5e0!3m2!1sen!2s!4v1751976378129!5m2!1sen!2s"
            width="100%"
            height="450"
            className="w-full h-96 border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </main>
  );
};

export default Contact;
