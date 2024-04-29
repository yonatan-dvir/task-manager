function toggleForm(formId) {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");

  if (formId === "loginForm") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    loginTab.classList.add("active-tab");
    signupTab.classList.remove("active-tab");
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    loginTab.classList.remove("active-tab");
    signupTab.classList.add("active-tab");
  }
}

async function signup(event) {
  event.preventDefault();
  const form = event.target;
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const age = document.getElementById("signupAge").value;

  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, age }),
    });

    const data = await response.json();

    if (response.ok) {
      // Show success message
      document.getElementById("message-signup").innerText =
        "User created successfully!";
      form.reset(); // Reset form fields
    } else {
      // Show error message
      console.log(data);
      document.getElementById("message-signup").innerText = data.error;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function login(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const form = event.target;

  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Show success message
      document.getElementById("message-login").innerText =
        "Welcome " + data.user.name + "!";
      form.reset(); // Reset form fields
    } else {
      // Show error message
      console.log(data);
      document.getElementById("message-login").innerText = data.error;
    }
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Invalid email or password. Please try again.");
  }
}
