// Form handler for user signup
const signupFormHandler = async (event) => {
  event.preventDefault();

  const realName = document.querySelector('#signupName').value.trim();
  const username = document.querySelector('#signupUser').value.trim();
  const password = document.querySelector('#signupPassword').value.trim();

  if (realName && username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ realName, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

// Form handler for logging in
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#loginUsername').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();
console.log("---------------------InloginFormHandler" + password)
  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

// Query selector to new user signup form
document
.querySelector('.signupForm')
.addEventListener('submit', signupFormHandler);

// Query selector for logging in
document
  .querySelector('.loginForm')
  .addEventListener('submit', loginFormHandler);

