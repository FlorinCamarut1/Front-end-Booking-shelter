import React, { useState, useEffect } from "react";
import "./LoginMenu.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { makeFetchRequest } from "../Utils/ApiFetch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginMenu = () => {
  const [showEye, setShowEye] = useState(false);
  // const [inputName, setInputName] = useState();
  // const [inputPassword, setInputPassword] = useState();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    password: "",
  });

  const goToRegister = () => {
    navigate("/register");
  };
  const loginCheck = async (e) => {
    e.preventDefault();
    let data = await makeFetchRequest("user/login", "POST", {
      username: input.name,
      password: input.password,
    });
    if (localStorage.getItem("username") === null) {
      localStorage.setItem("username", JSON.stringify(data));
    }
    navigate("/landing");
    // try {
    //   const response = await fetch("http://localhost:3000/user/login", {
    //     method: "POST", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, *cors, same-origin
    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: "same-origin", // include, *same-origin, omit
    //     headers: {
    //       "Content-Type": "application/json",
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: "follow", // manual, *follow, error
    //     referrerPolicy: "no-referrer",
    //     body: JSON.stringify({
    //       username: input.name,
    //       password: input.password,
    //     }),
    //   });
    //   response.json().then((data) => {
    //     if (response.status === 200) {
    //       if (localStorage.getItem("username") === null) {
    //         localStorage.setItem("username", JSON.stringify(data));
    //         navigate("/landing");
    //       }
    //       // User successfully added to the database
    //       // You can now redirect the user to the desired page or show a success message.
    //     } else {
    //       alert("User or password incorrect");
    //       // Handle errors, such as duplicate username, etc.
    //       // You can redirect the user back to the login page with an error message.
    //     }
    //   });
    // } catch (error) {
    //   console.error("Error adding user:", error);
    //   // Handle other errors, such as network errors.
    // }
  };

  // const handleChange = (e) => {
  //   if (e.target.name === "name") {
  //     setInputName(e.target.value);
  //   } else {
  //     setInputPassword(e.target.value);
  //   }
  // };

  const handleChange = (e) => {
    const newInput = Object.assign({}, input);
    newInput[e.target.name] = e.target.value;
    setInput(newInput);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        loginCheck(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [input.name, input.password]);

  return (
    <div className="body-img">
      <ToastContainer />
      <form className="layout">
        <div className="container--inputUsr">
          <label className="labels">Username</label>

          <input
            className="input-box"
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          ></input>
        </div>
        <div className="container--inputPass">
          <label className="labels">Password</label>
          <input
            className="input-box"
            type={showEye ? "text" : "password"}
            name="password"
            id="myInput"
            value={input.password}
            onChange={handleChange}
          ></input>
          {showEye ? (
            <VisibilityIcon
              className="eye--icon"
              onClick={() => setShowEye(false)}
            />
          ) : (
            <VisibilityOffIcon
              className="eye--icon "
              onClick={() => setShowEye(true)}
            />
          )}
        </div>
        <div className="btn--box">
          <button className="btn" onClick={goToRegister}>
            Register
          </button>
          <button className="btn" onClick={loginCheck}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginMenu;
