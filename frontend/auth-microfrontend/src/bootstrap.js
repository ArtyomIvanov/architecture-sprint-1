import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import * as auth from "../../src/utils/auth";

ReactDOM.render(<Login />, document.getElementById('root'));

React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
        auth
            .checkToken(token)
            .then((res) => {
                setEmail(res.data.email);
                setIsLoggedIn(true);
                history.push("/");
            })
            .catch((err) => {
                localStorage.removeItem("jwt");
                console.log(err);
            });
    }
}, [history]);