import { useEffect } from "react";
import { useUser, User } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    console.log("add user: ", user);
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user: User) => {
    console.log(user.email);
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };
  console.log("user in use Auth", user);
  return { user, login, logout };
};