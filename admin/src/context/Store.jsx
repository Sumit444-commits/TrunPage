import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
  const Api = import.meta.env.VITE_BASE_URI;
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [user, setUser] = useState("");
  const [sale, setSale] = useState("");
  const [customers, setCustomers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [books, setBooks] = useState([]);
  const [sales, setSales] = useState([]);
  const AuthorizationToken = `Bearer ${token}`;
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = !!token;

  const storeTokenInLS = (adminToken) => {
    localStorage.setItem("adminToken", adminToken);
    setToken(adminToken);
    return true;
  };

  const userAuthentication = async () => {
    setIsLoading(false);
    try {
      const response = await fetch(`${Api}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        setUser(res_data);
        // console.log(user);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const userLogout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
    setUser("");
  };

  const updateUserData = async (data) => {
    try {
      const response = await fetch(`${Api}/api/auth/user/update`, {
        method: "PATCH",
        headers: {
          Authorization: AuthorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Data updated Successfully");
        userAuthentication();
        return true;
      }
    } catch (error) {
      console.log("Error in updating data", error);
    }
  };

  const updateBookDataById = async (id, data) => {
    try {
      const response = await fetch(`${Api}/api/admin/services/update/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: AuthorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Data updated Successfully");
        getAllData("services");
        return true;
      }
    } catch (error) {
      console.log("Error in updating book data", error);
    }
  };

  const getSaleDataById = async (id) => {
    try {
      const response = await fetch(`${Api}/api/sales/get/${id}`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSale(data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  const updateSaleStatusById = async (id, data) => {
    try {
      const response = await fetch(`${Api}/api/sales/update/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: AuthorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Sale Status Changed Successfully");
        getAllData("sales");
        return true;
      }
    } catch (error) {
      console.log("Error in updating Sale Status", error);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await fetch(`${Api}/api/admin/services/add`, {
        method: "POST",
        headers: {
          Authorization: AuthorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        toast.success("New Book Added Successfully");
        getAllData("services");
        return true;
      }
    } catch (error) {
      console.log("Error Creating new book", error);
    }
  };

  const getAllData = async (path) => {
    try {
      const response = await fetch(`${Api}/api/admin/${path}`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      const res_data = await response.json();
      if (response.ok) {
        if (path === "users") {
          setCustomers(res_data);
        }
        if (path === "contacts") {
          setContacts(res_data);
        }

        if (path === "services") {
          setBooks(res_data);
        }

        if (path === "sales") {
          setSales(res_data);
        }
      }
    } catch (error) {
      console.log("error fetching customers");
    }
  };

  //   const deleteAllData = async (path) => {
  //   try {
  //     const response = await fetch(`${Api}/api/admin/${path}/delete/all`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: AuthorizationToken,
  //         "Content-Type": "application/json", // Optional but safe to include
  //       },
  //     });

  //     if (response.ok) {
  //       toast.success("Data cleared successfully");
  //       getAllData(path); // Call this only if successful
  //     } else {
  //       const errorData = await response.json().catch(() => ({})); // handle non-JSON response
  //       const errorMessage = errorData.message || "Failed to delete data";
  //       toast.error(errorMessage);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting data:", error);
  //     toast.error("An error occurred while deleting data");
  //   }
  // };

  const deleteDataById = async (id, path) => {
    try {
      const response = await fetch(`${Api}/api/admin/${path}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (response.ok) {
        toast.success("Data Deleted successfully");
      }

      getAllData(path);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token || isLoggedIn) {
      userAuthentication();
    }
  }, [token, isLoggedIn]);

  useEffect(() => {
    if (token || isLoggedIn) {
      getAllData("users");
      getAllData("contacts");
      getAllData("services");
      getAllData("sales");
    }
  }, [token, isLoggedIn]);

  return (
    <StoreContext.Provider
      value={{
        Api,
        isLoggedIn,
        AuthorizationToken,
        userAuthentication,
        storeTokenInLS,
        user,
        userLogout,
        updateUserData,
        isLoading,
        customers,
        deleteDataById,
        getAllData,
        contacts,
        books,
        updateBookDataById,
        addBook,
        sales,
        updateSaleStatusById,
        getSaleDataById,
        sale
        // deleteAllData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
