import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types'
import Spinner from '../layout/spinner';
class NuevoLibro extends Component {
    state = { 
       libro: {
        titulo: '',
        ISBN: '',
        editorial: '',
        existencia: 0,
        prestados: []
       },
       loading: false
     }
    leerDato = e => {
        const {libro} = this.state;
        libro[e.target.name]= e.target.value
        this.setState({
            libro
        });
    }

    agregarLibro = (e) => {
        e.preventDefault();

        // tomar copia del state
        const nuevoLibro = this.state.libro;

        // extraer firestore
        const { firestore , history } = this.props;
        // añadir y redireccionar
        this.setState({loading: true});
        firestore.add({collection:'libros'},nuevoLibro).then(
            res =>{ 
                history.push('/')
            },
            err => {
                this.setState({loading: false});
                alert('Error al cargar')
            }

        )
    }

    render() { 
        if(this.state.loading) return <Spinner/>
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
                        <i className="fas fa-user-plus"></i>{' '}
                        Nuevo Libro
                    </h2>
                    <div className="container">
                        <form onSubmit={this.agregarLibro}>
                            <div className="form-group">
                                <label>Titulo: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="titulo"
                                    placeholder="Titulo de libro"
                                    required
                                    onChange={this.leerDato}
                                    value={this.state.libro.titulo}
                                />
                            </div>
                            <div className="form-group">
                                <label>ISBN: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="ISBN"
                                    placeholder="ISBN del libro"
                                    required
                                    onChange={this.leerDato}
                                    value={this.state.libro.ISBN}
                                />
                            </div>
                            <div className="form-group">
                                <label>Editorial: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="editorial"
                                    placeholder="Editorial del libro"
                                    required
                                    onChange={this.leerDato}
                                    value={this.state.libro.editorial}
                                />
                            </div>
                            <div className="form-group">
                                <label>Existencia: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="existencia"
                                    placeholder="Existencia"
                                    required
                                    onChange={this.leerDato}
                                    value={this.state.libro.existencia}
                                />
                            </div>
                            <input 
                                type="submit"
                                value="Agregar Libro"
                                className="btn btn-success"
                            />
                        </form>
                    </div>
                </div>
             </div>
        );
    }
}

NuevoLibro.propTypes= {
    firestore: PropTypes.object.isRequired
}
export default firestoreConnect()(NuevoLibro);