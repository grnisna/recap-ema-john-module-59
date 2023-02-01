import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextRoutes/UserContext";
import "./SignUp.css";

const SignUp = () => {

    const [error, setError]  = useState(null);
    const [firebaseError, setFirebaseError] = useState(null);
    const {user,createUser} = useContext(AuthContext);

    const navigate = useNavigate();


    const handleSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if(password.length < 6){
            setError("Password should be need 6 charecter long or more")
        }
        else if(password !== confirmPassword){
            setError("Don't match password")
        }

        createUser(email,password)
        .then(result =>{
          const user = result.user;
          console.log(user);
          form.reset();
          navigate('/')
        })
        .catch(error =>{
          setFirebaseError(error.message);
          console.error(error.message);
        })


    }


  return (
    <div className="forms">
      <form  onSubmit={handleSubmit}>
        <p>Sign Up</p>

        <div className="inputDiv">
          <label htmlFor="email">Email:</label>
          <br />
          <input type="email" id="email" name="email" className="inputField" />
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
        {error ? <span  className="errorText">{error}</span> : "" }
        <div className="inputDiv">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <br />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="inputField"
          />
        </div>
        {error ? <span className="errorText">{error}</span> : "" }
       

        <div className="submitBtn">
          <input type="submit" value="LOGIN" className="Btn" />
        </div>
      </form>

      { firebaseError ?  <p><small className="errorText"> {firebaseError}  </small></p> : "" }

      <p>
        Already have account? <Link to="/login">LOGIN</Link>{" "}
      </p>
    </div>
  );
};

export default SignUp;
