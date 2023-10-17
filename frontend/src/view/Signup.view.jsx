import React from "react";
import { useState } from "react";
import styles from "../styles/signup.css";
import Builder from "../assets/builder.png";
import Player from "../assets/player.png";
import Logo from "../assets/logo.png";
import LoadingBee from "../components/loading/Loading";

const SignupView = (props) => {
  const {
    onSubmit,
    onChange,
    username,
    firstName,
    lastName,
    password,
    confirmPassword,
    registrationSuccess,
    login,
    missingInfoError,
    usernameError,
    passwordError,
    loading,
  } = props;

  // State for ROLE SELECTION
  const [selectedRole, setSelectedRole] = useState(null);

  // Function for ROLE SELECTION
  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    onChange({
      target: {
        id: "role",
        value: role,
      },
    });
  };

  return (
    <div className="signuppage-container">
      {loading && (
        <LoadingBee message="Account successfully created! Please login with your new account credentials" />
      )}
      <img className="logo-signup" src={Logo} alt="QuizyB logo" />
      <div className="signuppage-container-box">
        {/* Description Section (Left Half) */}
        <div className="description-section">
          <div className="description-part">
            <h2>Bee the Best!</h2>
            <div className="role-section-signup">
              <div className="role-image-signup">
                <img src={Builder} alt="Quiz Builder" />
              </div>
              <div className="role-description-signup">
                <h3>Bee the Quiz Builder!</h3>
                <p>
                  Create buzzworthy questions and generate a special quiz code
                  that you can share with friends, colleagues, or students for
                  them to take your uniquely crafted quiz.
                </p>
              </div>
            </div>
            <div className="role-section-signup">
              <div className="role-image-signup">
                <img src={Player} alt="Quiz Player" />
              </div>
              <div className="role-description-signup">
                <h3>Bee the Quiz Player!</h3>
                <p>
                  Get ready to explore and dive into the world of quizzes
                  designed just for you. Just input the unique quiz code
                  provided by the Quiz Builder to enter the hive, and you're
                  ready to fly, honey!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Signup Section (Right Half) */}
        <div className="signup-section">
          <h2>What will you bee-come?</h2>
          <div className="role-buttons-signup">
            <button
              className={`builder-button ${
                selectedRole === "builder" ? "selected" : ""
              }`}
              type="submit"
              name="builderRole"
              id="builderRole"
              value="Builder"
              onClick={() => handleRoleSelection("builder")}
            >
              Quiz Builder
            </button>

            <button
              className={`player-button ${
                selectedRole === "player" ? "selected" : ""
              }`}
              type="submit"
              name="playerRole"
              id="playerRole"
              value="Player"
              onClick={() => handleRoleSelection("player")}
            >
              Quiz Player
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="form-group-signup">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={onChange}
              />
              {usernameError && (
                <div className="error-message-signup">
                  Buzz! This username is already taken. Try another one.
                </div>
              )}
            </div>
            <div className="form-group-signup columns">
              <div className="column">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={onChange}
                />
              </div>
              <div className="column">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group-signup columns">
              <div className="column">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="column">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                />
              </div>
            </div>

            {passwordError && (
              <div className="error-message-signup">
                Oh honey, Passwords didn't match. Please check and try again
              </div>
            )}

            {missingInfoError && (
              <div className="error-message-signup">
                Hold up! Fill out all fields to join our hive!
              </div>
            )}
            {registrationSuccess && (
              <div className="success-message-signup">
                Your account has been created. Start quizzing!
              </div>
            )}
            <div className="button-container-signup">
              <button type="submit">Let's Bee-gin!</button>
              <a onClick={login}>I already have an account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupView;
