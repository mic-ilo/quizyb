import React from "react";
import styles from "../styles/login.css";
import Bee from "../assets/bee-cut.png";
import Logo from "../assets/logo.png";
import LoadingBee from "../components/loading/Loading"

const LoginView = (props) => {
  const {
    onSubmit,
    onChange,
    username,
    password,
    emptyDataError,
    loginError,
    loginSuccess,
    signup,
    loading
  } = props;

  return (
    <div className="loginpage-container">
      {loading && <LoadingBee/>}
      <img className="logo" src={Logo} alt="QuizyB logo" />
      <div className="login-container">
        {/* Left Section with Brand Image */}
        <div className="brand-section">
          <h1>
            #BeetheBest <br /> with QuizyB!
          </h1>

          <img src={Bee} alt="Brand" />
        </div>

        {/* Right Section with Login Form */}
        <div className="login-section">
          <h1>Welcome Back to the Hive!</h1>
          <p>Log in and Start Quizzing</p>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                onChange={onChange}
                id="username"
                name="username"
                type="text"
                value={username}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                onChange={onChange}
                id="password"
                name="password"
                type="password"
                value={password}
              />
            </div>

            {emptyDataError && (
              <div className="error-message-login">
                Hey bee! Fields can't be empty. <br /> Please enter username &
                password to enter the hive.
              </div>
            )}
            {loginError && (
              <div className="error-message-login">
                Buzz Off! Wrong username or password. Please try again.
              </div>
            )}
            {loginSuccess && (
              <div className="success-message-login">
                Welcome back, Quiz Bee! Let the quizzing begin.
              </div>
            )}

            <div className="button-container-login">
              <button type="submit">Buzz Me In</button>
              <a onClick={signup}>Sign me up in the hive!</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
