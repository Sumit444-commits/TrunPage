import { useEffect, useState } from "react";
import BookForm from "../components/Layout/BookForm";
import BookCard from "../components/Layout/BookCard";
import { FaPlus } from "react-icons/fa";
import { useStore } from "../context/Store";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const { books, deleteDataById, isLoggedIn, updateBookDataById, addBook } = useStore();
  const [editBook, setEditBook] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [type, setType] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Filter books based on "type"
  const getFilteredBooks = () => {
    if (type === "free") return books.filter(book => book.price === 0);
    if (type === "paid") return books.filter(book => book.price > 0);
    return books;
  };

  const handleFilterChange = (e) => {
    setType(e.target.value);
  };

  const handleDelete = (id) => {
    deleteDataById(id, "services");
  };

  const handleAddOrUpdate = (book) => {
    if (book._id) {
      updateBookDataById(book._id, book);
    } else {
      addBook(book);
    }
    setFormVisible(false);
    setEditBook(null);
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setFormVisible(true);
  };

  const handleAddClick = () => {
    setEditBook(null);
    setFormVisible(!formVisible);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Books</h2>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
        >
          <FaPlus /> Add Book
        </button>
      </div>

      <div className="mb-4">
       
        <select
          value={type}
          onChange={handleFilterChange}
          className="block w-40 text-white bg-purple-500 hover:bg-purple-600  rounded-md shadow-sm px-3 py-2"
        >
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {formVisible && (
        <div className="mb-8 bg-white shadow-md rounded-lg p-6">
          <BookForm
            onSubmit={handleAddOrUpdate}
            editBook={editBook}
            onCancel={() => {
              setFormVisible(false);
              setEditBook(null);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredBooks().map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={handleDelete}
            onEdit={() => handleEdit(book)}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
