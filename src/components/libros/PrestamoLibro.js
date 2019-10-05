import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types';
import FichaSuscriptor from '../suscriptores/FichaSuscriptor';

class PrestamoLibro extends Component {
    state = { 
        busqueda: '',
        alumnoBusqueda: null,
        loading: false
    }
    
    leerDato = e => {
       
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    buscarAlumno = e => {
        e.preventDefault();
        const { busqueda } = this.state;
        const { firestore } = this.props;

        const collection = firestore.collection('suscriptores');
        const consulta = collection.where('codigo','==',busqueda).get();

        consulta.then(res => {
            if(res.empty) {
                // no hay resultado
                this.setState({
                    alumnoBusqueda: null,
                    sinResultado: false
                });
            } else {
                const alumnoBusqueda = res.docs[0].data();
                this.setState({
                    alumnoBusqueda,
                    sinResultado: true
                });
            }
        })

    };
    solitarPrestamo = () => {
        const suscriptor = this.state.alumnoBusqueda;

        // Fecha de alta
        suscriptor.fecha_solicitud = new Date().toLocaleDateString();
        // 

        const libroActualizado = this.props.libro;

        libroActualizado.prestados.push(suscriptor);

        //obtener firestore

        const { firestore, history } = this.props;
        this.setState({loading: true})
        firestore.update({
            collection: 'libros',
            doc: libroActualizado.id
        }, libroActualizado).then( res => { 
                history.push('/');
            }
        ).catch(err => {
            this.setState({loading: false})
        });

    }
    render() { 
        const { libro } = this.props;
        if(!libro || this.state.loading) return <Spinner/>

        const { busqueda , alumnoBusqueda } = this.state;
        let fichaAlumno = null;
        let btnSolicitar = null;
        if(busqueda) {
            if(alumnoBusqueda) {
                fichaAlumno = <FichaSuscriptor 
                 alumno={alumnoBusqueda}/>
                btnSolicitar = <button
                        type="button"
                        className="btn btn-success mt-2"
                        onClick={this.solitarPrestamo}
                >
                    Solicitar Prestamo
                </button>
            }
        }

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
                        <form onSubmit={this.buscarAlumno}>
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
                        {fichaAlumno}
                        {btnSolicitar}
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
    connect(({firestore: {ordered},usuario},props) => ({
        libro: ordered.libro && ordered.libro[0],
        usuario: usuario
    }))
)(PrestamoLibro);