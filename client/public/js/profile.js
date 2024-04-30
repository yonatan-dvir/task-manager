async function showProfile() {
  try {
    const response = await fetch("http://localhost:3000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header with the JWT token
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Show success message
      console.log(data);
    } else {
      // Show error message
      console.log(data);
      document.getElementById("message-signup").innerText = data.error;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

showProfile();
