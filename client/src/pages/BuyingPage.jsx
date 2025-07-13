import React, { useState, useEffect } from "react";
import InputField from "../components/UI/InputField";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store/AppContext";

const defaultData = {
  email: "",
  receipt: "",
};

const BuyingPage = () => {
  const { buyBook, user, getBookById ,isAuthenticated, isLoggedIn} = useStore();
  const { userId, bookId } = useParams();
  const navigate = useNavigate();

  const [buyingData, setBuyingData] = useState(defaultData);
  const [book, setBook] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if(!isLoggedIn){
    navigate("/login")
  }

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (user?.email) {
      setBuyingData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  // Fetch book by ID
  useEffect(() => {
    if (bookId) {
      getBookData();
    }
  }, [bookId]);

  const getBookData = async () => {
    const data = await getBookById(bookId);
    setBook(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);

    try {
      const response = await fetch(import.meta.env.VITE_CLOUDINARY_URI, {
        method: "POST",
        body: data,
      });

      const uploadedImage = await response.json();

      if (!uploadedImage?.url) {
        throw new Error("Image upload failed");
      }

      setBuyingData((prev) => ({ ...prev, receipt: uploadedImage.url }));
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload receipt. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyingData.email || !buyingData.receipt) {
      alert("Please enter your email and upload a receipt image.");
      return;
    }

    setIsSubmitting(true);
    try {
      await buyBook(userId, bookId, buyingData);
      alert("Request submitted! We'll verify it within 24 hours.");
      setBuyingData(defaultData); // Reset form
      isAuthenticated()
      navigate("/books");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 md:p-8 max-w-3xl mx-auto mt-6 rounded-lg shadow-2xl mb-6">

       {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-md text-indigo-600 hover:underline"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-6">
        Purchase Book
      </h1>


      {/* Book Details */}
      {book ? (
        <div className="bg-white border rounded p-4 mb-6 text-sm md:text-base shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
          {book.image && (
            <img
              src={book.image}
              alt={book.title}
              className="w-24 h-32 object-cover rounded shadow"
            />
          )}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {book.title}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Book Name:</strong> {book.name}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Category:</strong> {book.category}
            </p>
            <p className="text-purple-700 font-bold text-lg">
              Price: PKR {book.price?.toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">Loading book details...</p>
      )}

      {/* Payment Notice */}
      <div className="text-center text-purple-600 font-semibold text-lg mb-6">
        💰 Please pay exactly{" "}
        <span className="underline">
          PKR {book?.price?.toLocaleString() || 0}
        </span>{" "}
        before uploading the receipt.
      </div>

      {/* Instructions */}
      <div className="bg-indigo-50 border border-indigo-200 rounded p-4 mb-6 text-sm md:text-base">
        <h2 className="text-lg font-semibold mb-2 text-indigo-800">
          📌 Instructions
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Send payment to the account details provided below.</li>
          <li>Upload a clear screenshot of the receipt.</li>
          <li>
            Provide your email address — we will send your book PDF there.
          </li>
          <li>We will verify and confirm your purchase within 24 hours.</li>
          <li>
            You can cancel your order by contacting support within 12 hours.
          </li>
          <li>
           Please pay exact amount before uploading the receipt. Else Purchased will be rejected.
          </li>
        </ul>
      </div>

      {/* Payment Info */}
      <div className="bg-white border rounded p-4 mb-6 text-sm md:text-base shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          💳 Payment Account Details
        </h3>
        <p>
          <strong>Bank Name:</strong> HBL Bank
        </p>
        <p>
          <strong>Account Number:</strong> 1234567890
        </p>
        <p>
          <strong>Account Name:</strong> TrunPage
        </p>
        <p>
          <strong>Payment Amount:</strong> PKR {book?.price}
        </p>
        <p className="text-red-500 mt-2">
          * Please double-check the account details before sending money.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Receipt Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Payment Receipt
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
          />
          {buyingData.receipt && (
            <img
              src={buyingData.receipt}
              alt="Receipt Preview"
              className="mt-3 h-40 w-full object-contain border rounded"
            />
          )}
        </div>

        {/* Email Field */}
        <InputField
          label="Your Email (to receive the PDF)"
          type="email"
          id="email"
          name="email"
          value={buyingData.email}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Purchase Request"}
        </button>
      </form>
    </div>
  );
};

export default BuyingPage;
