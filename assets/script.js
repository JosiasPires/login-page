const target = process.env.REACT_APP_TARGET_URL;
const token = sessionStorage.getItem('token');

if(token) {
  window.location.href = `${target}?code=${token}`;
}

const loginForm = document.getElementById("form_login");
const loginButton = document.getElementById("form_login");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const username = loginForm.username.value;
  const password = loginForm.password.value;

  if(username && password) {
    const API_URL = process.env.REACT_APP_API_URL;
    const API_TOKEN = process.env.REACT_APP_API_TOKEN;
    (async () => {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "Authorization": API_TOKEN
        },
        body: JSON.stringify({
          identifier: username,
          password
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        const { user, jwt } = json;
        if(user) {
          sessionStorage.setItem('token', jwt);
        }
        document.location.reload(true);
      })
      .catch(function(error) {
        console.log("Error:", error);
      });
    })();
  }
});
