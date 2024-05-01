async function showProfile() {
  try {
    const response = await fetch("http://localhost:3000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header with the JWT token
      },
    });

    const user = await response.json();

    if (response.ok) {
      console.log(user);
      renderProfile(user);
    } else {
      // Show error message
      console.log(user);
      document.getElementById("profile-details").innerText = user.error;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderProfile(user) {
  document.getElementById("profile-details").innerHTML = `
    <h3>${user.name}'s Profile</h3>
    <div class="profile-item">
      <label>Email:</label>
      <span>${user.email}</span>
    </div>
    <div class="profile-item">
      <label>Name:</label>
      <span>${user.name}</span>
    </div>
    <div class="profile-item">
      <label>Age:</label>
      <span>${user.age}</span>
    </div>
  `;
}

showProfile();
