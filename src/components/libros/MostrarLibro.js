import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types';
class MostrarLibro extends Component {
    state = {  }
    devolverLibro = (id) => {
       const { firestore } = this.props;

       const libroUpdate = {...this.props.libro};

       const prestados = libroUpdate.prestados.filter(elemento => {
          return elemento.codigo !== id
       });
       libroUpdate.prestados = prestados;

       firestore.update({
           collection: 'libros',
           doc: libroUpdate.id
       },libroUpdate)
    };
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
                    {libro.prestados.length === 0 ? null:
                        <h3 className="my-2 text-center">
                            Personas que tiene el libro
                        </h3>            
                    }
                    {libro.prestados.map(prestado => (
                        <div key={prestado.codigo} className="card">
                            <h4 className="card-header">
                                {prestado.apellido}{' '}{prestado.nombre}
                            </h4>
                            <div className="card-body">
                                <p>
                                    <span className="font-weight-bold">
                                        Código:
                                    </span>{' '}
                                    {prestado.codigo}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        Carrera:
                                    </span>{' '}
                                    {prestado.carrera}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        Fecha Solicitud:
                                    </span>{' '}
                                    {prestado.fecha_solicitud}
                                </p>
                            </div>
                            <div className="card-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block font-weight-bold"
                                    onClick={()=>this.devolverLibro(prestado.codigo)}
                                >
                                    Realizar devolución
                                </button>
                            </div>
                        </div>
                    ))}
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