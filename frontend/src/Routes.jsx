import { useContext } from "react";

import Register from "./pages/Register";
import { UserContext } from "./UserContext";

const Routes = () => {
  const { username, id } = useContext(UserContext);

  if (!username || !id) {
    return <Register />;
  }

  return (
    <>
      <h1>Welcome, {username}!</h1>
      <p>Your unique ID: {id}</p>
    </>
  );
};

export default Routes;
