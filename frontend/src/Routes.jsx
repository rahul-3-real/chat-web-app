import { useContext } from "react";

import { Register } from "./pages";
import { UserContext } from "./UserContext";

const Routes = () => {
  const { username, id } = useContext(UserContext);
  console.log(username, id);

  return (
    <>
      <Register />
    </>
  );
};

export default Routes;
