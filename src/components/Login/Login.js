import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
//import Button from "react-bootstrap/Button";
import './Login.css';
class Login extends React.Component {
    state = {
        email: '',
        password: '',
        enviado: false
    }

    loginHandler = () => {
        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1nopdV4mmQ6f5COYHbu8BDPluQIf1KpM', authData)
            .then(response => {
                this.props.setAuthentication(true, response.data);
                this.setState({ enviado: true });
                console.log(response);
            })
            .catch(err => {
                this.props.setAuthentication(false, {});
                alert('Usuario o password incorrecto...');
                console.log(err);
            });
    }

    render() {
        let redireccion = null;
        let login = null;
        let log = null;
        if (this.state.enviado) {
            redireccion = (<Redirect to="/historial" />)
        } else {
           /* login = (<div><h1>LOGIN</h1>
                <label>Email</label>
                <input type="text" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                <label>Password</label>
                <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                <Button onClick={this.loginHandler} variant="success">Login</Button> </div>)*/
            log = (<div className="login-page">
                <div className="form">
                    <div className="login-form">
                        <input type="text" placeholder="username" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                        <input type="password" placeholder="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                        <button onClick={this.loginHandler} variant="success">login</button>

                    </div>
                </div>
            </div>)

        }


        return (
            <>
                {redireccion}
                {login}
                {log}
            </>
        )
    }
}

export default Login;