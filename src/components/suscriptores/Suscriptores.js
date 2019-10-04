import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types';
class Suscriptores extends Component {
    state = {  }
    eliminarSuscriptor = (suscriptorId) => {
        const { firestore } = this.props;
        firestore.delete({
            collection: 'suscriptores',
            doc: suscriptorId
        });
    };
    render() { 
        const suscriptores = this.props.suscriptores;
        if(!suscriptores) return <Spinner />;
        return ( 
            <div className="row">
                <div className="col-md-12 mb-4">
                    <Link 
                      to="/suscriptores/nuevo"
                      className="btn btn-primary">
                          <i className="fas fa-plus"></i>{' '}
                          Nuevo Suscriptor
                      </Link>
                </div>
                <div className="col-md-8">
                    <h2>
                        <i className="fas fa-user"></i>
                        Suscriptores
                    </h2>
                </div>
                <table className="table table-striped mt-4">
                    <thead className="text-ligth text-white bg-primary">
                        <tr>
                            <th>Nombre</th>
                            <th>Carrera</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {suscriptores.map( suscriptor => (
                            <tr key={suscriptor.id}>
                                <td>{suscriptor.nombre} {suscriptor.apellido}</td>
                                <td>{suscriptor.carrera}</td>
                                <td>
                                    <Link
                                        to={`/suscriptores/mostrar/${suscriptor.id}`}
                                        className = " btn btn-success btn-block"
                                    >
                                        <i className="fas fa-angle-double-rigth">
                                            Más Información
                                        </i>
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-block"
                                        onClick = {() => this.eliminarSuscriptor(suscriptor.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i>{' '}
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

Suscriptores.protoTypes = {
    firestore: PropTypes.object.isRequired,
    Suscriptores: PropTypes.array
}

export default compose(
    firestoreConnect([{collection: 'suscriptores'}]),
    connect((state,props) => {
        return {
            suscriptores: state.firestore.ordered.suscriptores
        }
    })
)(Suscriptores);