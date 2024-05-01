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
    <h2>${user.name}'s Profile</h2>
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

async function showTasks() {
  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header with the JWT token
      },
    });

    const tasks = await response.json();
    if (response.ok) {
      console.log(tasks);
      renderTasks(tasks);
    } else {
      // Show error message
      console.log(tasks);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderTasks(tasks) {
  const taskList = document.getElementById("taskList");

  // Clear the existing content of the task list
  taskList.innerHTML = "";

  // Iterate over each task and append a new list item for each one
  tasks.forEach((task) => {
    if (!task.completed) {
      const listItem = document.createElement("li");
      listItem.textContent = task.description;
      taskList.appendChild(listItem);
    }
  });
}

async function addTask(event) {
  event.preventDefault();
  const form = event.target;
  const description = document.getElementById("taskName").value;
  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header with the JWT token
      },
      body: JSON.stringify({ description }),
    });

    const task = await response.json();
    if (response.ok) {
      console.log(task);
      form.reset();
      showTasks();
    } else {
      // Show error message
      console.log(task);
      document.getElementById("profile-details").innerText = task.error;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

showProfile();
showTasks();
