import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextRoutes/UserContext";
import "./Login.css";

const Login = () => {
  const [error, setError] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);
  const [typingEmail, setTypingEmail] = useState(null);

  const { user, loggedInUser, resetPassword } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loggedInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        navigate("/");
      })
      .catch((error) => {
        setFirebaseError(error.message);
        setError(error.message);
        console.error(error.message);
      });
  };

  const handleEmailBlur = (event) => {
    const email = event.target.value;
    setTypingEmail(email);
  };

  const handleResetPassword = () => {
    resetPassword(typingEmail)
      .then(() => {
        alert("sending email for reset passworr");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="forms">
      <form onSubmit={handleSubmit}>
        <p>Log in</p>

        <div className="inputDiv">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            onBlur={handleEmailBlur}
            type="text"
            id="email"
            name="email"
            className="inputField"
          />
        </div>

        <div className="inputDiv">
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            className="inputField"
          />
        </div>
        {error ? <span className="errorText">{error}</span> : ""}

        <div className="submitBtn">
          <input type="submit" value="LOGIN" className="Btn" />
        </div>
      </form>
      {firebaseError ? (
        <p>
          <small className="errorText"> {firebaseError} </small>
        </p>
      ) : (
        ""
      )}

      <p>
        For Registration <Link to="/signup">Registration</Link>{" "}
      </p>
      <small>
        Forget Password? <button onClick={handleResetPassword}>Reset Now</button>{" "}
      </small>
    </div>
  );
};

export default Login;
