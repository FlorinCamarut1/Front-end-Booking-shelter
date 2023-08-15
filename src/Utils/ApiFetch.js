import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const succesMsg = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const baseUrl = "http://localhost:3000/";
export async function makeFetchRequest(url, method, body) {
  let header = {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  if (method !== "GET") {
    header.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(baseUrl + url, header);

    if (!response.ok) {
      if (response.status === 404) {
        notify("User or password incorrect !!!");
      } else if (response.status === 400) {
        notify(
          "Username and password cannot be empty: Enter a valid username and password"
        );
        // Handle errors, such as duplicate username, etc.
        // You can redirect the user back to the login page with an error message.
      } else if (response.status === 409) {
        notify("User already exists");
      } else if (response.status === 410) {
        notify("Please pick a valid date");
      } else if (response.status === 411) {
        notify("Date Already Booked");
      }
    } else if (response.status === 200 && url === "user/adduser") {
      succesMsg("Account created successfully");
    } else if (response.status === 200 && url === "Bookings/book") {
      succesMsg("You booked a date!!");
      // User successfully added to the database
      // You can now redirect the user to the desired page or show a success message.
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);

    throw error;
  }
}
