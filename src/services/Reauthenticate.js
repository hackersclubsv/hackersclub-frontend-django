import { useContext, useEffect } from "react";
import axios from "../api/axios";
import { UserContext } from "../contexts/UserContext";
import jwt_decode from "jwt-decode";

/*
 * This is no-ui component, it's used to reauthenticate the user when the page is refreshed.
 */

const Reauthenticate = () => {
  const { user, setUser } = useContext(UserContext);

  /*
   * It's better to use cookies for authentication, wait for the backend to be ready.
   */
  // eslint-disable-next-line 
  const reauthWithCookies = async () => {
    try {
      const res = await axios.post(
        "/users/refresh",
        {}, // empty body, because we're using cookies, and the cookie will be sent automatically
        {
          withCredentials: true, // send cookies with the request automatically (this is the default behavior)
        },
      );

      // Decode the JWT and get the user id
      const decoded = jwt_decode(res.data.accessToken);
      const response = await axios.get(`/users/${decoded.id}`);
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const reauthWithLocalStorage = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return;

    // Send the refreshToken to the backend to get a new accessToken, the headers configuration could be improved (if set in axios.js)
    const res = await axios.post(
      "/token/refresh/",
      {
        refresh: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      },
    );

    if (res.data.refresh) {
      // If a new refreshToken is returned, store it in localStorage
      localStorage.setItem("refreshToken", res.data.refresh);
    }

    // Decode the JWT and get the user id
    const decoded = jwt_decode(res.data.access);
    const response = await axios.get(`/users/${decoded.user_id}`);
    setUser(response.data);
  };

  // Side effect that triggers when this compunent is mounted (when the page is refreshed).
  useEffect(() => {
    reauthWithLocalStorage();
    // this is a static function, it doesn't need any dependencies, that's why we disable the rule (warning)
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  // Side efect that triggers every time the user changes, and stores the user in localStorage.
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user)); // a static method, JSON.stringify.() converts the object to a string
  }, [user]);

  // This component doesn't render anything, so it returns null.
  return null;
};

export default Reauthenticate;
