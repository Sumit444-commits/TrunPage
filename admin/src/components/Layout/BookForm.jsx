// import { useState, useEffect } from "react";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import InputField from "../ui/InputField"

// const BookForm = ({ onSubmit, editBook, onCancel }) => {
//   const [form, setForm] = useState({
//     name: "",
//     title: "",
//     price: "",
//     category: "",
//     image: "",
//   });

//   useEffect(() => {
//     if (editBook) {
//       setForm(editBook);
//     } else {
//       setForm({
//         name: "",
//         title: "",
//         price: "",
//         category: "",
//         image: "",
//       });
//     }
//   }, [editBook]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ ...form, price: parseFloat(form.price) });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {["name", "title", "price", "category", "image"].map((field) => (
//         <InputField
//         label={field.toUpperCase()}
//           key={field}
//           name={field}
//           value={form[field]}
//           onChange={handleChange}
//           placeholder={`Enter ${field}`}
//         //   className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       ))}
//       <div className="flex gap-3 col-span-1 md:col-span-2">
//         <button
//           type="submit"
//           className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
//         >
//           <FaCheck />
//           {editBook ? "Update Book" : "Add Book"}
//         </button>
//         <button
//           type="button"
//           onClick={onCancel}
//           className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow"
//         >
//           <FaTimes /> Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BookForm;

import { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import InputField from "../ui/InputField";

const defaultData = {
  name: "",
  title: "",
  price: "",
  category: "",
  image: "",
};

const BookForm = ({ onSubmit, editBook, onCancel }) => {
  const [form, setForm] = useState(defaultData);

  const [imagePreview, setImagePreview] = useState("");
  const [useFileUpload, setUseFileUpload] = useState(true); // toggle mode

  useEffect(() => {
    if (editBook) {
      setForm(editBook);
      setImagePreview(editBook.image || "");
      setUseFileUpload(false); // default to link mode if editing
    } else {
      setForm(defaultData);
      setImagePreview("");
    }
  }, [editBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "image" && !useFileUpload) {
      setImagePreview(value);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);

    const response = await fetch(import.meta.env.VITE_CLOUDINARY_URI, {
      method: "POST",
      body: data,
    });

    const uploaded_image = await response.json()
    setForm((prev) => ({ ...prev, image: uploaded_image.url }));
    setImagePreview(uploaded_image.url);
 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.image) return alert("Please select or paste an image.");
    onSubmit({ ...form, price: parseFloat(form.price) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Text Inputs */}
      {["name", "title", "price", "category"].map((field) => (
        <InputField
          label={field.toUpperCase()}
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={`Enter ${field}`}
          required
        />
      ))}

      {/* Image Input Toggle */}
      <div className="col-span-1 md:col-span-2 flex items-center gap-4">
        <span className="font-semibold text-gray-700">Image:</span>
        <button
          type="button"
          onClick={() => setUseFileUpload(!useFileUpload)}
          className="text-sm text-blue-600 underline"
        >
          {useFileUpload ? "Paste image link instead" : "Upload from device"}
        </button>
      </div>

      {/* File Upload or Link Input */}
      {useFileUpload ? (
        <div className="col-span-1 md:col-span-2">
           {/* <span className="bg-blue-800/50 rounded-sm px-2">Choose File</span>  */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
      ) : (
        <InputField
          label="IMAGE LINK"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Paste image URL"
        />
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-sm font-semibold text-gray-600">
            Preview:
          </label>
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-48 rounded border border-gray-300 shadow"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 col-span-1 md:col-span-2 mt-2">
        <button
          type="submit"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          <FaCheck />
          {editBook ? "Update Book" : "Add Book"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow"
        >
          <FaTimes /> Cancel
        </button>
      </div>
    </form>
  );
};

export default BookForm;
