import { useContext } from "react";

import { Register } from "./pages";
import { UserContext } from "./UserContext";

const Routes = () => {
  const { username, id } = useContext(UserContext);

  if (username) {
    return (
      <div>
        <h1>Welcome, {username}!</h1>
        <p>Your unique ID: {id}</p>
      </div>
    );
  }

  return (
    <>
      <Register />
    </>
  );
};

export default Routes;
