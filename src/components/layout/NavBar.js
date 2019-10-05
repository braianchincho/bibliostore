import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';

class NavBar extends React.Component {
    state = {
        isAutenticated: false
    };
    // recibe prors automaticamente
    // autocompletado gdsfp
    static getDerivedStateFromProps(props, state) {
        const { auth } = props;
        if(auth.uid) {
            //set state
            return { isAutenticated: true }
        } else {
            //set state
            return {isAutenticated: false}
        }
    }

    cerrarSesion = () => {
        const { firebase } = this.props;
        firebase.logout();
    }

    render() {
        const { isAutenticated } = this.state;
        // Extrar datos de autentición
        const { auth } = this.props;
        return ( 
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
            <nav className="navbar navbar-light">
                <span className="navbar-brand mb-0 h1">
                    Administrador de Biblioteca
                </span>
            </nav>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse" id="navbarColor01">
                { isAutenticated ? 
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={'/suscriptores'} className="nav-link">
                                Suscriptores
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link">
                                Libros
                            </Link>
                        </li>
                    </ul>
                    : null
                }
            </div>
            {
               isAutenticated ? 
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="#!" className="nav-link">
                            {auth.email}
                        </a>
                    </li>
                    <li className="nav-item">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.cerrarSesion}
                        >
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
                : null
            }
        </nav>
     
         );
    }
}
 
export default compose(
    firebaseConnect(),
    connect((state,props) => ({
        auth: state.firebase.auth
    }))
)(NavBar);