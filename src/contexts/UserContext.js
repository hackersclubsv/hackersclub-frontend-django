import { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
