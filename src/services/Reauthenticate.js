import { useContext, useEffect } from "react";
import axios from "../api/axios";
import { UserContext } from "../contexts/UserContext";
import jwt_decode from "jwt-decode";

const Reauthenticate = () => {
  const { setUser } = useContext(UserContext);

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

  return null;
};

export default Reauthenticate;
