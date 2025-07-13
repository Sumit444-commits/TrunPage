import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const BookCard = ({ book, onDelete, onEdit }) => {

   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col justify-between h-full">
      <img
        src={book.image}
        alt={book.name}
        className="rounded-md h-48 w-full object-cover mb-4"
        onClick={handleImageClick}
      />
      <h3 className="text-lg font-semibold text-gray-800">{book.name}</h3>
      <p className="text-sm text-gray-600">{book.title}</p>
      <p className="text-sm text-gray-500 mt-1">Category: {book.category}</p>
      <p className="text-green-600 font-bold mt-2">${book.price.toFixed(2)}</p>

      <div className="flex mt-4 gap-3">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-700 text-white text-sm px-3 py-1 rounded shadow"
        >
          <FaEdit /> Edit
        </button>
        <button
          onClick={() => onDelete(book._id)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded shadow"
        >
          <FaTrash /> Delete
        </button>
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
