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
        alert("User or password incorrect !!!");
      }
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);

    throw error;
  }
}
