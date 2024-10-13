import axios from "axios";
import { useState, createContext, useEffect } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  const fetchUserData = async () => {
    const response = await axios.get("/auth/profile");
    setId(response.data.user._id);
    setUsername(response.data.user.username);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
};
