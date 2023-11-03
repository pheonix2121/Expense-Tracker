import React, {  useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/AuthRedux";
import classes from "./Home.module.css"

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, isProfileCompleted} = useSelector(state=> state.auth)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };



  return (
    <div className={classes.homeElem}>
              <h1>Welcome to the expense tracker</h1>
              {!isProfileCompleted && (
        <Link to="/profile">
          <p>Your profile is not completed. Complete now.</p>
        </Link>
      )}

      {isProfileCompleted && (
        <Link to="/profile">
        <p>Still Want to Update The Profile. Let's Go.</p>
        </Link>
      )}
              {isProfileCompleted && (
                <Link to="/verification">
              <p>Your profile is completed. Go to Verification</p>
            </Link>
          )}
    <Link to="/expenseTracker">Ready To Track Your Expense</Link>
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