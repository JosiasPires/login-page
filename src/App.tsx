import { useState, memo } from 'react';
import './style.css';

const App = () => {
	const [username, setUsername] = useState<String>('');
	const [password, setPassword] = useState<String>('');
	const token = sessionStorage.getItem('token');

	if(token) {
      window.location.href = `${process.env.REACT_APP_TARGET_URL}?code=${token}`;
	}

	const handleSubmit = () => {
		(async () => {
			await fetch(`${process.env.REACT_APP_API_URL}`, {
				method: 'POST',
          		headers: {
            		"Content-type": "application/json",
            		"Authorization": `${process.env.REACT_APP_API_TOKEN}`
          		},
          		body: JSON.stringify({
            		identifier: username,
            		password
          		})
        	})
        	.then(response =>response.json())
        	.then(json => {
          		const { user, jwt } = json;
          		if(user) sessionStorage.setItem('token', jwt);
          		document.location.reload();
        	})
        	.catch(error => console.log("Error:", error))
            .finally(() => console.log("End"));
      	})();
  	}

	return (
		<div className="content">
			<h2 className="title">{`${process.env.REACT_APP_PAGE_NAME}`}</h2>
			<form
				onSubmit={e => e.preventDefault()}
				className="form"
			>
				<label className="subtitle">
					Você tem uma conta?
				</label>
				<input
					type="text"
                    placeholder="Usuário"
                    onChange={e => setUsername(e.target.value)}
                    className="username"
          		/>
          		<div className="passwordBox">
					<input
                  		type="password"
                  		placeholder="Senha"
                  		onChange={e => setPassword(e.target.value)}
                        className="password"
              		/>
          		</div>
          		<button
                    type="submit"
					onClick={handleSubmit}
					className="btnLogin"
				>
					ENTRAR
				</button>
          		<div className="rememberMe">
              		<input type="checkbox" />
              		<label>Lembre-se de mim</label>
          		</div>
      		</form>
      		<a href="#app">Esqueci minha senha</a>
    	</div>
  	);
};

export default memo(App);
