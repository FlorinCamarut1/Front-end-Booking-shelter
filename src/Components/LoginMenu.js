import React, { useState } from "react";
import "./LoginMenu.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginMenu = () => {
  const [showEye, setShowEye] = useState(false);
  // const [inputName, setInputName] = useState();
  // const [inputPassword, setInputPassword] = useState();

  const [input, setInput] = useState({
    name: "",
    password: "",
  });
  const noRefresh = (e) => {
    e.preventDefault();
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
        <input
          className="submit"
          type="submit"
          value="Submit"
          onClick={noRefresh}
        ></input>
      </div>
    </form>
  );
};

export default LoginMenu;