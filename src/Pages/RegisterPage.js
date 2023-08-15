import React, { useState, useEffect } from "react";
import "../Components/LoginMenu.css";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { makeFetchRequest } from "../Utils/ApiFetch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [showEye, setShowEye] = useState(false);
  const [input, setInput] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  /**
   * go back button
   */
  const goBack = () => {
    navigate("/");
  };

  /**
   * get data from input
   * @param {*} e
   */
  const createAcc = (e) => {
    console.log(e.key);
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  /**
   * fetch data from back-end API--add new users to database
   * @param {*} e
   */
  const registerHandler = async (e) => {
    e.preventDefault();
    let data = await makeFetchRequest("user/adduser", "POST", {
      username: input.name,
      password: input.password,
      age: Math.trunc(Math.random() * 50),
    });

    // try {
    //   const response = await fetch("http://localhost:3000/user/adduser", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: input.name,
    //       password: input.password,
    //       age: Math.trunc(Math.random() * 50),
    //     }),
    //   });
    // } catch (error) {
    //   alert("Error adding user: " + error);
    //   // Handle other errors, such as network errors.
    // }
  };
  /**
   * subbmit on pressing enter.
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        registerHandler(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [input.name, input.password]);

  return (
    <div className={styles.bodyImage}>
      <ToastContainer />
      <form className="layout">
        <div className={styles.containerReg}>
          <div className={styles.containerLabelInputUsr}>
            <label className={styles.labelUsr}>Username</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={input.name}
              onChange={createAcc}
            />
          </div>
          <div className={styles.containerLabelInputPas}>
            <label className={styles.labelPas}>Password</label>
            <input
              className={styles.input}
              type={showEye ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={createAcc}
            />
            {showEye ? (
              <VisibilityIcon
                className="eye--icon"
                onClick={() => setShowEye(false)}
              />
            ) : (
              <VisibilityOffIcon
                className="eye--icon"
                onClick={() => setShowEye(true)}
              />
            )}
          </div>
          <div className={styles.containerSubGob}>
            <button onClick={goBack} className="btn">
              Go back
            </button>
            <button onClick={registerHandler} className="btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
