import React, { useState } from "react";
import styles from "../styles/UserProfile.css";
import BackIcon from '../assets/back.png';
import BeeCut from '../assets/bee-cut.png';
import Logo from "../assets/logo.png";
import Loading from "../components/loading/Loading";

function UserProfile(props) {
  const {
    handleChange,
    firstName,
    lastName,
    username,
    role,
    newPassword,
    confirmPassword,
    handlePasswordUpdate,
    passwordError,
    passwordUpdateSuccess,
    showUpdatePasswordPopup,
    showDeleteAccountPopup,
    toggleUpdatePasswordPopup,
    toggleDeleteAccountPopup,
    handleAccountDeletion,
    backtoDashboard,
    accountDeletion,
    loading
  } = props;

  return (
    <div className = "userprofilepage-container">
      {loading && <Loading message="Account changes in progress"/> }
      <img className="logo" src={Logo} alt="QuizyB logo" />
      <div className="user-profile-container">

        {/* Icons */}
        <div className="icons">
     
          <div className="back-icon-userprofile"> 
              <img src={BackIcon} alt="Back Icon" onClick={backtoDashboard}/>
          </div>
                      
          <div className="bee-icon">
            <img src={BeeCut} alt="Bee"/>
          </div>

        </div>



        {/* Real Name Section */}
        <div className="realname-section">
          <div className="name-section">
            <div className="name-label">Name:</div>
            <div className="name-value">
              {firstName} {lastName}
            </div>
          </div>
        </div>

        {/* Username Section */}
        <div className="username-section-profile">
          <h3>Username:</h3>
          <p>{username}</p>
        </div>

        {/* Role Section */}
        <div className="role-section-profile">
          <h3>Your Role:</h3>
          <p>{role}</p>
        </div>

        {/* Action Section */}
        <div className="action-section">
          {/* Button to trigger password update pop-up */}
          <button
            className="update-password-btn"
            onClick={toggleUpdatePasswordPopup}
          >
            Update Password
          </button>
          {/* Gap between buttons */}
          <div className="button-gap"></div>
          {/* Button to trigger account deletion pop-up */}
          <button
            className="delete-account-btn"
            onClick={toggleDeleteAccountPopup}
          >
            Delete Account
          </button>
        </div>

        

        {/* Password Update Popup */}
        {showUpdatePasswordPopup && (
          <div className="popup-container">
            <div className="popup password-update">
              <h3>Update Password</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="password"
                    id="newPassword"
                    onChange={handleChange}
                    value={newPassword}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                  />
                </div>
                {passwordError && (
                  <div className="error-message">
                    Buzz Off! Passwords did not match. Please try again.
                  </div>
                )}
                {passwordUpdateSuccess && (
                  <div className="success-message">
                    Bee-come secure! Your password is being updated. Please login again.
                  </div>
                )}
                <button
                  className="change-pw-btn"
                  type="submit"
                  onClick={handlePasswordUpdate}
                >
                  Change It
                </button>
                <button
                  className="return-btn"
                  onClick={toggleUpdatePasswordPopup}
                >
                  Return
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Delete Account Popup */}
        {showDeleteAccountPopup && (
          <div className="popup-container">
            <div className="popup delete-account">
              <h3>Are you sure you want to leave the hive?</h3>
              {accountDeletion && (
                <p>Farewell! Your account is being deleted. <br/>  Take care and bee happy!</p>
              )}
              <div className="button-container">
                <button className="delete-yes" onClick={handleAccountDeletion}>
                  Yes, I do. <br/> Let me bee free
                </button>
                <button className="delete-no" onClick={toggleDeleteAccountPopup}>
                  No way! <br/> Take me back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
