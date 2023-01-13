import { useState, memo, useEffect } from 'react';
import './style.css';

/**
 * Components
 */
import { Loader, Toast } from './components';

/**
 * Utils
 */
import setCookie from './utils/setCookie';
import getCookie from './utils/getCookie';
import clearCookies from './utils/clearCookies';

const App = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [openToast, setOpenToast] = useState<boolean>(true);

    useEffect(() => {
        setUsername(getCookie("username"));
        setRemember(Boolean(getCookie("remember")));
    }, []);

	const handleSubmit = () => {
        if(remember) {
            setCookie("username", username, 1);
            setCookie("remember", remember, 1);
        } else {
            clearCookies();
        }

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
        	.then(response => {
                if(response.status === 429) {
                    setError('Tente novamente mais tarde.');
                    setOpenToast(true);
                    setTimeout(() => setOpenToast(false), 2000);
                    /**
                     * Bloquear via cookie com 5 minutos para liberar
                     */
                }
                setLoading(true);
                return response.json();
            })
        	.then(data => {
                if(data.error.status === 400) {
                    setError('Usuário ou Senha inválidos!');
                    setOpenToast(true);
                    setTimeout(() => setOpenToast(false), 2000);
                }
          		const { user, jwt } = data;
          		if(user) {
                    window.location.href = `${process.env.REACT_APP_TARGET_URL}?code=${jwt}`;
                }
        	})
        	.catch(error => console.error(error))
            .finally(() => setLoading(false));
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
                    disabled={loading}
                    value={username}
                    required
                />
                <div className="passwordBox">
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => setPassword(e.target.value)}
                        className="password"
                        disabled={loading}
                        required
                    />
                </div>
                {loading ?
                (<div className="loader">
                    <Loader />
                </div>) :
                (<button
                    type="submit"
                    onClick={handleSubmit}
                    className="btnLogin"
                    disabled={loading}
                >
                    ENTRAR
                </button>)}
                <div className="rememberMe">
                    <input
                        type="checkbox"
                        onChange={e => setRemember(e.target.checked)}
                        checked={remember}
                    />
                    <label> Lembre-se de mim</label>
                </div>
            </form>
            <a href="#app">Esqueci minha senha</a>
        </div>
    );
};

export default memo(App);
