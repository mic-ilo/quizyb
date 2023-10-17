import { useState } from "react";
import UserModel from "../model/providers/UserModel";
import { useNavigate } from "react-router-dom";
//view
import SignupView from "../view/Signup.view";

export default function UserController() {
  const [userData, setUserData] = useState({
    _id: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    isActive: true,
    role: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [missingInfoError, setMissingInfoError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  // ALI ADDED: usernameError state above

  //HANDLE CHANGE
  const handleChange = (event) => {
    switch (event.target.id) {
      case "username":
        setUserData({ ...userData, username: event.target.value });
        break;

      case "firstName":
        setUserData({ ...userData, firstName: event.target.value });
        break;

      case "lastName":
        setUserData({ ...userData, lastName: event.target.value });
        break;

      case "password":
        setUserData({ ...userData, password: event.target.value });
        break;

      case "confirmPassword":
        setConfirmPassword(event.target.value);
        break;

      case "role":
        setUserData({ ...userData, role: event.target.value });
        break;
    }
  };

  //HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Check if the password matches the confirmPassword
      if (userData.password !== confirmPassword) {
        setPasswordError(true);
        return;
      }
      // Check if any required fields are empty
      if (
        !userData.username ||
        !userData.firstName ||
        !userData.lastName ||
        !userData.password ||
        !userData.role ||
        !confirmPassword
      ) {
        setMissingInfoError(true);
        return;
      }

      const response = await UserModel.addUser({ ...userData });
      setRegistrationSuccess(true);
      setUserData({
        ...userData,
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        role: "",
      });

      setRegistrationSuccess(true);
      setMissingInfoError(false);
      setPasswordError(false);
      setUsernameError(false);
      setConfirmPassword("");
      setLoading(true);
      setTimeout(() => {
        navigate("/login");
        setLoading(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
      setUsernameError(true);
    }
  };

  const loginNavigate = () => {
    navigate("/login");
  };
  return (
    <div>
      <SignupView
        onChange={handleChange}
        onSubmit={handleSubmit}
        registrationSuccess={registrationSuccess}
        passwordError={passwordError}
        username={userData.username}
        firstName={userData.firstName}
        lastName={userData.lastName}
        password={userData.password}
        confirmPassword={confirmPassword}
        login={loginNavigate}
        missingInfoError={missingInfoError}
        usernameError={usernameError}
        loading={loading}
      />
    </div>
  );
}
