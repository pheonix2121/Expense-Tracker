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
  console.log(isProfileCompleted)

 
        return (
            <div>
              <h1>Welcome to the expense tracker</h1>
                {!isProfileCompleted && <Link to="/profile">
                  <p>Your profile is not completed. Complete now.</p>  
                </Link>}
        
                {isProfileCompleted && <Link to="/profile">
                  <p>Still Want to Update The Profile. Lets Go.</p>  
                </Link>}
        
              {isProfileCompleted && (
                <Link to="/verification">
              <p>Your profile is completed. Go to Verification</p>
            </Link>
          )}
    
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