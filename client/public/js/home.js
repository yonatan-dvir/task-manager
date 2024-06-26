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
      document.getElementById("header-title").innerHTML = `
    <h1>${user.name}'s Task manager</h1>`;
      //renderProfile(user);
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
      listItem.id = task._id;
      // Add Mark as completed button
      const completedButton = document.createElement("input");
      completedButton.type = "checkbox";
      // Call completeTask with task ID when button is clicked
      completedButton.addEventListener("click", () => completeTask(task._id));
      listItem.appendChild(completedButton);
      // Add task description
      const description = document.createElement("span");
      description.textContent = task.description;
      listItem.appendChild(description);

      // Append the whole task (checkbox and description) to the list
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

async function completeTask(taskId) {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header with the JWT token
      },
      body: JSON.stringify({ completed: true }),
    });

    const task = await response.json();
    if (response.ok) {
      console.log(task);

      const taskElement = document.getElementById(taskId);
      taskElement.style.transition = "opacity 1.5s";
      taskElement.style.opacity = "0";

      setTimeout(() => {
        showTasks();
      }, 1500);
    } else {
      // Show error message
      console.log(task);
      document.getElementById("profile-details").innerText = task.error;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function logout() {
  try {
    const response = await fetch("http://localhost:3000/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Clear token from local storage
      localStorage.removeItem("token");

      // Redirect the user to the home.html page
      window.location.href = "login-signup.html";
    } else {
      // Show error message
      console.log(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function checkLoggedIn() {
  const token = localStorage.getItem("token");
  if (!token) {
    // Redirect to login page or display error message
    window.location.href = "login-signup.html";
  }
}

// Call the function when the page loads
checkLoggedIn();

showProfile();
showTasks();
document.getElementById("logoutBtn").addEventListener("click", logout);
