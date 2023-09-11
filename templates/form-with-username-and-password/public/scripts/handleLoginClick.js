async function handleLoginClick() {
    const loginForm = document.querySelector("#form_login");
    const identifier = loginForm.identifier.value;
    const password = loginForm.password.value;

    if (identifier && password) {
        try {
            const response = await fetch("<API_URL>", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer <API_TOKEN>"
                },
                body: JSON.stringify({
                    identifier,
                    password
                })
            });
            alert(response);
            if (response.ok) {
                const data = await response.json();
                const { user, jwt } = data;
                if (user) {
                    localStorage.setItem('token', jwt);
                    document.location.reload(true);
                }
            } else {
                alert("Failed to log in.");
                console.error("Failed to log in.");
            }
        } catch (error) {
            alert(error);
            console.error(error);
        } finally {
            alert("End");
            console.log("End");
        }
    }
}

document.querySelector("#button_login").addEventListener("click", handleLoginClick);