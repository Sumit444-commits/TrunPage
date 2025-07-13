import { useStore } from "../context/Store";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useEffect } from "react";

const Customers = () => {
  const { customers, deleteDataById, isLoggedIn } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleEdit = (id) => {
    navigate(`/customers/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteDataById(id, "users");
  };

  return (
    <section className="bg-gray-50 p-3 sm:p-5 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Customers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-4">
              <img
                src={customer.profile_url}
                alt={customer.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {customer.username}
                </h2>
                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Phone:</span> {customer.phone}
            </p>
            <div className="flex justify-end text-2xl items-center space-x-4 text-gray-500">
              <button
                onClick={() => handleEdit(customer._id.toString())}
                title="Edit"
              >
                <FiEdit className="hover:text-green-600 cursor-pointer" />
              </button>
              <button
                onClick={() => handleDelete(customer._id.toString())}
                title="Delete"
              >
                <FiTrash className="hover:text-red-600 cursor-pointer" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Customers;
