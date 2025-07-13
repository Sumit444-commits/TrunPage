import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useStore } from "../context/Store";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"

function Contacts() {
  const {
    getAllData,
    contacts,
    // deleteAllData,
    deleteDataById,
    isLoggedIn,
  } = useStore();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const deleteContact = (id) => {
    deleteDataById(id, "contacts");
  };

  // const deleteAll = () => {
  // deleteAllData("contacts");
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">
            Contact Messages
          </h1>
          {/*           
            <button
              onClick={deleteAll}
              className="mt-4 md:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete All
            </button> */}
        </div>

        {contacts.length === 0 ? (
          <p className="text-center text-gray-500">No contacts available.</p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="relative bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow"
              >
                {/* Top-right delete icon for mobile only */}
                <button
                  onClick={() => deleteContact(contact._id.toString())}
                  className="absolute top-6 right-2 text-red-500 hover:text-red-700 transition md:hidden"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {contact.username}
                    </p>
                    <p className="text-sm text-gray-500">{contact.email}</p>
                  </div>

                  {/* Inline delete button for desktop */}
                  <button
                    onClick={() => deleteContact(contact._id.toString())}
                    className="hidden md:block text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>

                <p className="text-gray-700 mt-2 break-words">
                  {contact.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contacts;
