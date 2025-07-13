import { createContext, useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

export const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
  const Api = import.meta.env.VITE_BASE_URI;
  const [token, setToken] = useState(localStorage.getItem("token"));
  const AutherizationWithToken = `Bearer ${token}`;
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const storeTokenInLS = (usertoken) => {
    setToken(usertoken);
    localStorage.setItem("token", usertoken);
  };

   const isAuthenticated = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${Api}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: AutherizationWithToken,
        },
      });
      const res_data = await response.json();

      if (response.ok) {
        setUser(res_data);
      }
    } catch (error) {
      console.error("Error Fetching user")
    }finally{
      setIsLoading(false)
    }
  };

  const isLoggedIn = !!token;

  const logoutUser = () => {
    setToken("");
    setUser("")
    localStorage.removeItem("token");
  };

  const userDataUpdate = async (updatedData) => {
    // console.log("new",updatedData);

    try {
      const response = await fetch(`${Api}/api/auth/user/update`, {
        method: "PATCH",
        headers: {
          Authorization: AutherizationWithToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      // const res_data = await response.json()
      // console.log("res",res_data);
      if (response.ok) {
        toast.success("Data updated Successfully");
        isAuthenticated();
        return true;
      }
    } catch (error) {
      console.error("Error in Editing User Data: ", error);
    }
  };

  const getBooksData = async ()=> {
    try {
      const response = await fetch(`${Api}/api/data/services`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const res_data = await response.json()
      if(response.ok){
        setBooks(res_data)
      }

    } catch (error) {
      console.error("Error in Fetching books Data: ",error)
    }
  }
 const getBookById = async (id) => {
    try {
      const response = await fetch(`${Api}/api/data/services/get/${id}`, {
        method: "GET",
        headers: {
          Authorization: AutherizationWithToken,
        },
      });

      const res_data = await response.json();
      if (response.ok) {
        setBook(res_data)
        return res_data
      } else {
        console.error("Failed to fetch book:", res_data?.message);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

 const getSaleById = async (id) => {
    try {
      const response = await fetch(`${Api}/api/sales/get/${id}`, {
        method: "GET",
        headers: {
          Authorization: AutherizationWithToken,
        },
      });

      const res_data = await response.json();
      if (response.ok) {
        // setSale(res_data)
        return res_data
      } else {
        console.error("Failed to fetch book:", res_data?.message);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  // buy service
  const buyBook =async (userId,bookId,data) => {
    try {
      const response = await fetch(`${Api}/api/sales/buy/${userId}/${bookId}`,{
        method: "POST",
        headers: {
          "Authorization": AutherizationWithToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if(response.ok){
        toast.success("Buying Request Successfully Submitted")
      }else{
        toast.error("Buying Request Failed")
      }
      
    } catch (error) {
      console.error("Error Buying the book",error)
    }
  }
  

  useEffect(() => {
    if(token || isLoggedIn){
      isAuthenticated();
    }
  }, [token,isLoggedIn]);
  useEffect(() => {
    if(token || isLoggedIn){

      getBooksData()
    }
  }, [token,isLoggedIn]);
  useEffect(() => {
    
      isAuthenticated();
      getBooksData()
  
  }, []);

  return (
    <StoreContext.Provider
      value={{
        Api,
        storeTokenInLS,
        isLoggedIn,
        logoutUser,
        user,
        userDataUpdate,
        books,
        isAuthenticated,
        buyBook,
        getBookById,
        book,
        isLoading,
        getSaleById
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
