import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';


class Login extends React.Component {
    state = { 
        email: '',
        password: ''
    }
    leerDatos = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    iniciarSesion = (e) => {
        e.preventDefault();

        const { firebase } = this.props;

        const { email, password } = this.state;

        firebase.login({
            email,
            password
        }).then(res => {
            console.log('logueado', res)
        }).catch(err => {
            console.log('error', err)
        });



    };

    render() { 
        return (  
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i>{' '}
                                Iniciar Sesión
                            </h2>
                            <form
                                onSubmit={this.iniciarSesion}
                            >
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.leerDatos}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.leerDatos}
                                    />
                                </div>
                                <input 
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    value="Iniciar Sesión"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default firestoreConnect()(Login);