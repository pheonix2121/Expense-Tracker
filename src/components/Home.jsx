import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../store/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const isProfileCompleted = authCtx.isProfileCompleted;
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  return (
    <div>
    <h1>Welcome to the expense tracker</h1>

    {!isProfileCompleted && (
      <Link to="/profile">
        <p>Your profile is not completed</p>
        <p>Complete now</p>
      </Link>
    )}
{isProfileCompleted && <Link><p>Your profile is completed. Go to </p></Link>}


    <nav>
      <ul>
        {!isLoggedIn && <Link to="/">Login</Link>}
        {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
      </ul>
    </nav>
  </div>
);
};

export default Home;