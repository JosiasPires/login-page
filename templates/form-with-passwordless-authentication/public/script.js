document.getElementById("button_login").addEventListener("click", (e) => {
    e.preventDefault();
  
    const loginForm = document.getElementById("form_login");
    const identifier = loginForm.identifier.value;

    if(identifier) {
        (async () => {
            await fetch("<API_URL>", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer <API_TOKEN>"
                },
                body: JSON.stringify({identifier})
            })
            .then(response =>response.json())
            .catch(error => console.error(error))
            .finally(() => console.log("End"));
        })();
    }
});

if(user) sessionStorage.setItem('token', jwt);
document.location.reload(true);
const target = "<TARGET_URL>";
const token = sessionStorage.getItem('token');
if(token) window.location.href = `${target}?code=${token}`;