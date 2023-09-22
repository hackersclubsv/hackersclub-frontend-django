import { useContext, useEffect } from "react";
import axios from "../api/axios";
import { UserContext } from "../contexts/UserContext";
import jwt_decode from "jwt-decode";

const Reauthenticate = () => {
  const { user, setUser } = useContext(UserContext);
  /*  This is the Express backend version, but we're using django now
  useEffect(() => {
    const reauthenticate = async () => {
      try {
        const res = await axios.post(
          "/users/refresh",
          {},
          {
            withCredentials: true,
          },
        );
        const decoded = jwt_decode(res.data.accessToken);
        const response = await axios.get(`/users/${decoded.id}`);
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    reauthenticate();
  }, []);
  */
  // Listen for changes in user object
  useEffect(() => {
    // console.log("User changed: ", user);
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  
  useEffect(() => {
    const reauthenticate = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        // console.log("Got refreshToken from localStorage");
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
          localStorage.setItem("refreshToken", res.data.refresh);
          // console.log("Got new refreshToken from server");
        }
        const decoded = jwt_decode(res.data.access);
        const response = await axios.get(`/users/${decoded.user_id}`);
        // console.log("request the user profile", response.data);
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    reauthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default Reauthenticate;
