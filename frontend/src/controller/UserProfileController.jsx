import { useEffect, useState } from "react";
import UserProfile from "../view/Userprofile.view";
import jwtDecode from "jwt-decode";
import Usermodel from "../model/providers/UserModel";
import { useNavigate } from "react-router-dom";

export default function UserProfilecontroller() {
  const navigate = useNavigate();

  //loading
  const [loading, setLoading] = useState(false);

  //Password states
  const [passwordError, setPasswordError] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    role: "",
  });

  // State variables for modal pop-up toggle
  const [showUpdatePasswordPopup, setShowUpdatePasswordPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);

  //Set account deletion
  const [accountDeletion, setAccountDeletion] = useState(false);

  // Visibility of update pw pop-up
  const toggleUpdatePasswordPopup = () => {
    setShowUpdatePasswordPopup(!showUpdatePasswordPopup);
  };

  // Bisibility of delete account pop-up
  const toggleDeleteAccountPopup = () => {
    setShowDeleteAccountPopup(!showDeleteAccountPopup);
  };
  //Decode token
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(jwtToken);

    setUserData({
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      username: decodedToken.username,
      role: decodedToken.role,
    });
  }, []);

  const [userPassword, setUserPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    switch (event.target.id) {
      case "newPassword":
        setUserPassword({
          ...userPassword,
          newPassword: event.target.value,
        });
        break;

      case "confirmPassword":
        setUserPassword({
          ...userPassword,
          confirmPassword: event.target.value,
        });
        break;
    }
  };

  //back to dashboard
  const backtoDashboard = () => {
    navigate(`/${userData.role}/dashboard`);
  };

  //handle password update
  const handlePasswordUpdate = async (event) => {
    event.preventDefault();

    const jwtToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(jwtToken);
    // Password mismatch validation
    if (userPassword.newPassword !== userPassword.confirmPassword) {
      setPasswordError(true);
      setPasswordUpdateSuccess(false);
      return;
    }

    try {
      const updatePassword = await Usermodel.updatePassword(
        userPassword.newPassword,
        decodedToken._id
      );

      // Successful password update
      setPasswordError(false);
      setPasswordUpdateSuccess(true);
      setLoading(true)

      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
        setLoading(false);
      }, 5000);
      
    } catch (error) {
      setLoading(false);
      const errorMessage = new Error("Error updating password");
      throw errorMessage;
    }
  };

  // Function to handle account deletion
  const handleAccountDeletion = async () => {
    const jwtToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(jwtToken);
    try {
      setAccountDeletion(true);
      const deleteAccount = await Usermodel.deleteUser(decodedToken._id);
      setAccountDeletion(true);
      setLoading(true);
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/");
        setLoading(false);
      }, 5000);
    } catch (error) {
      const errorMessage = new Error("Error deleting account");
      throw errorMessage;
    }
  };

  return (
    <>
      <UserProfile
        handleChange={handleChange}
        firstName={userData.firstName}
        lastName={userData.lastName}
        username={userData.username}
        role={userData.role}
        currentPassword={userPassword.currentPassword}
        newPassword={userPassword.newPassword}
        handlePasswordUpdate={handlePasswordUpdate}
        passwordError={passwordError}
        passwordUpdateSuccess={passwordUpdateSuccess}
        showUpdatePasswordPopup={showUpdatePasswordPopup}
        showDeleteAccountPopup={showDeleteAccountPopup}
        toggleUpdatePasswordPopup={toggleUpdatePasswordPopup}
        toggleDeleteAccountPopup={toggleDeleteAccountPopup}
        handleAccountDeletion={handleAccountDeletion}
        backtoDashboard={backtoDashboard}
        accountDeletion={accountDeletion}
        loading={loading} 
      />
    </>
  );
}
