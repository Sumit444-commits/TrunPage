import React, { useState } from "react";
import { useStore } from "../../store/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookCard = ({ book }) => {
  const isFree = book.price === 0;
  const { Api, user, isLoggedIn } = useStore();
  const navigate = useNavigate()

  const handleDownload = async (imageUrl, name) => {
    if (!isFree) {
      return;
    }
    const response = await fetch(
      `${Api}/api/download/image?url=${encodeURIComponent(imageUrl)}`
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleBuy = (userId,bookId) => {
    if(!isLoggedIn){
      toast.info("Please login to buy")
      return navigate("/login")
    }
    if(isFree){
      return
    }
    navigate(`book/buy/${userId}/${bookId}`)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-xs relative">
      {/* Badge */}
      <div className="absolute top-3 right-3">
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full ${
            isFree
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {isFree ? "Free" : "Paid"}
        </span>
      </div>

      {/* Book Image */}
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-64 object-cover"
        onClick={handleImageClick}
      />

      {/* Book Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-indigo-700 capitalize">
          {book.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">{book.title}</p>
        <p className="text-sm text-gray-500 capitalize">
          Category: {book.category}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-indigo-600 font-semibold">
            {isFree ? "$0.00" : `$${book.price.toFixed(2)}`}
          </span>
          <button
            onClick={() => {
              {
                isFree
                  ? handleDownload(book.image, book.name)
                  : handleBuy(user._id, book._id);
              }
            }}
            className="bg-indigo-600 text-white text-sm px-4 py-1 rounded hover:bg-indigo-700 transition"
          >
            {isFree ? "Download" : "Buy"}
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-50"
        >
          <img
            src={book?.image}
            alt="Full-size avatar"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default BookCard;
