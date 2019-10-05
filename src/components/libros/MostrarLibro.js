import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types';
class MostrarLibro extends Component {
    state = {  }
    render() { 
        const { libro } = this.props;
        if(!libro) return <Spinner/>
        //boton solicitar libro 
        let botonSolicitarLibro = null;
        const librosDiponibles = libro.existencia - libro.prestados.length;
        if(librosDiponibles > 0) {
            botonSolicitarLibro = <Link 
              to={`/libros/prestamo/${libro.id}`}
              className="btn btn-success my-3"
            >
                Solicitar Prestamo
            </Link>
        }
        return ( 
            <div className="row">
                <div className="col-md-10 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al listado
                    </Link>
                </div>
                <div className="col-md-2">
                    <Link to={`/libros/editar/${libro.id}`} className="btn btn-primary float-rigth">
                        <i className="fas fa-arrow-circle-rigth"></i>{' '}
                        Editar Libro
                    </Link>
                </div>
                <hr className="mx-5 w-100"/>
                <div className="col-12">
                    <h2 className="mb-4">
                        {libro.titulo} 
                    </h2>
            
                    <p>
                        <span className="font-weight-bold">
                            ISBN:
                        </span>{' '}
                        {libro.ISBN}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            editorial:
                        </span>{' '}
                        {libro.editorial}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            existencia:
                        </span>{' '}
                        {libro.existencia}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            disponibles:
                        </span>{' '}
                        {librosDiponibles}
                    </p>
                    {botonSolicitarLibro}
                </div>
            </div>
        );
    }
}
 
MostrarLibro.propTypes = {
    libro: PropTypes.object.isRequired
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
)(MostrarLibro);