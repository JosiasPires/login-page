document.querySelector('#toggle').addEventListener('click', () => {
    let pwd = document.querySelector('#password');
    if (pwd.type === 'password') {
        pwd.type = 'text';
    } else {
        pwd.type = 'password';
    }
  });
  

document.getElementById("button_login").addEventListener("click", (e) => {
    e.preventDefault();
  
    const loginForm = document.getElementById("form_login");
    const identifier = loginForm.identifier.value;
    const password = loginForm.password.value;

    if(identifier && password) {
        (async () => {
            await fetch("<API_URL>", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer <API_TOKEN>"
                },
                body: JSON.stringify({
                    identifier,
                    password
                })
            })
            .then(response =>response.json())
            .then(data => {
                const { user, jwt } = data;
                if(user) sessionStorage.setItem('token', jwt);
                document.location.reload(true);
            })
            .catch(error => console.error(error))
            .finally(() => console.log("End"));
        })();
    }
});

const target = "<TARGET_URL>";
const token = sessionStorage.getItem('token');
if(token) window.location.href = `${target}?code=${token}`;