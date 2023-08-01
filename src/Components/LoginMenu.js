import React, { useState, useEffect } from "react";
import "./LoginMenu.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

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
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: input.name,
          password: input.password,
        }),
      });

      if (response.status === 200) {
        navigate("/landing");
        // User successfully added to the database
        // You can now redirect the user to the desired page or show a success message.
      } else {
        alert("User or password incorrect");
        // Handle errors, such as duplicate username, etc.
        // You can redirect the user back to the login page with an error message.
      }
    } catch (error) {
      console.error("Error adding user:", error);
      // Handle other errors, such as network errors.
    }
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
    <form className="layout">
      <div className="container--login">
        <div className="container--input">
          <label className="labels">UserName</label>

          <input
            className="input-box"
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          ></input>
        </div>
        <div className="container--input">
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
      </div>
    </form>
  );
};

export default LoginMenu;
