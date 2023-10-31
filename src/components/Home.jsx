import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../store/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  return (
    <div >
        <h1>welcome to expense tracker </h1>

      <nav >
        <ul>
          {!isLoggedIn && (
            <Link to="/" >
              Login
            </Link>
          )}
          {isLoggedIn && (
            <button onClick={logoutHandler}>Logout</button>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Home;