import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const fetctUser = async () => {
        try {
          const decoded = jwt_decode(token);
          const response = await axios.get(`http://localhost:4000/users/${decoded.user.id}`);
          console.log("This is from UserContext ",response.data);
          setUser(response.data);
          // console.log("This is ",user);
          // setUser(decoded);
        } catch (err) {
          console.log("Error decoding token", err);
          // localStorage.removeItem("token");
        }
      };
      fetctUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
