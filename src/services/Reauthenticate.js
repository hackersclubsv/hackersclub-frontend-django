import { useContext, useEffect } from "react";
import axios from "../api/axios";
import { UserContext } from "../contexts/UserContext";
import jwt_decode from "jwt-decode";

const Reauthenticate = () => {
  const { setUser } = useContext(UserContext);
{/*  This is the Express backend version, but we're using django now
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
  */}
  useEffect(() => {
    const reauthenticate = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken"); 
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
        const decoded = jwt_decode(res.data.access);
        console.log(decoded);
        const response = await axios.get(`/users/${decoded.user_id}`);
        console.log(response.data);
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    reauthenticate();
  }, []);
  return null;
};

export default Reauthenticate;
