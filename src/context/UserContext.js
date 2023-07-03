import { createContext, useState, useEffect, Children, useContext} from "react";
import axios from "axios";

export const UserContext = ({children}) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    user: {},
  });

  const getAuthStatus = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(process.env.REACT_APP_AUTH_STATUS);

      setAuth(res.data.auth);
    } catch (error) {
      if (error) {
        console.log("Access denied");
      }
    }
  };

  useEffect(() => {
    console.log("UserContext pozvan user: ", auth);
    getAuthStatus();

    return () => {
      console.log("Unmounting, UserContext User: ", auth);
      setAuth({
        isLoggedIn: false,
        user: {}
      });
    };
  }, []);

  return(
    <User.Provider value={{auth, setAuth}}>
      {children}
    </User.Provider>
  )
}

const User = createContext();

export const useUser = () => {
  return useContext(User);
}

