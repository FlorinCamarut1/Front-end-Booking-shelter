import logo from "./logo.svg";
import "./App.css";
import LoginMenu from "./Components/LoginMenu";
import { width } from "@mui/system";

function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        className="backgound-iamge"
        src={process.env.PUBLIC_URL + "/fog-gc436ea590_1920.jpg"}
        alt="padure"
      />
      <LoginMenu></LoginMenu>
    </div>
  );
}

export default App;
