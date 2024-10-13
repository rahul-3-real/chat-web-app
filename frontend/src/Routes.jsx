import { useContext } from "react";

import Chat from "./pages/Chat";
import Register from "./pages/Register";
import { UserContext } from "./UserContext";

const Routes = () => {
  const { username, id } = useContext(UserContext);

  if (!username || !id) {
    return <Register />;
  }

  return (
    <>
      <Chat username={username} id={id} />
    </>
  );
};

export default Routes;
