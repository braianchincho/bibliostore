import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types';

class PrestamoLibro extends Component {
    state = {  }
    render() { 
        const { libro } = this.props;
        if(!libro) return <Spinner/>
        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i>{' '}
                        Solicitar Prestamo: {libro.titulo}
                    </h2>
                </div>
                <div className="container">
                    <div className="ml-6 mr-6">
                        <form>
                            <legend className="color-primary text-center">
                                Buscar el Suscriptor por Código
                            </legend>
                            <div className="form-group">
                                <input 
                                    type="text"
                                    name="busqueda"
                                    className="form-control"
                                    onChange={this.leerDato}
                                />
                                <input 
                                  value="Buscar alumno"
                                  type="submit"
                                  className="btn btn-success btn-block mt-2"
                                 />
                            </div>
                        </form>
                    </div>
               </div>
            </div>
        );
    }
}
PrestamoLibro.propTypes= {
    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [
        {
            collection: 'libros',
            storeAs: 'libro',
            doc: props.match.params.id
        }
    ]),
    connect(({firestore: {ordered}},props) => ({
        libro: ordered.libro && ordered.libro[0]
    }))
)(PrestamoLibro);