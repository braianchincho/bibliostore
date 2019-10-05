import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types';

class EditarSuscriptor extends Component {
    state = {}
    suscriptorRef = {
        nombre: React.createRef(),
        apellido: React.createRef(),
        codigo: React.createRef(),
        carrera: React.createRef()
    }
   
    leerDato = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    agregarSuscriptor = (event,id) => {
        
        event.preventDefault();
        const suscriptorRef = this.suscriptorRef;
        const editarSuscriptor  = {
            nombre: suscriptorRef.nombre.current.value,
            apellido: suscriptorRef.apellido.current.value,
            codigo: suscriptorRef.codigo.current.value,
            carrera: suscriptorRef.carrera.current.value,
        };
        const { firestore , history} = this.props;
        
        firestore.update({
            collection: 'suscriptores',
            doc: id
        },editarSuscriptor)
        .then(
            (res) => history.push('/suscriptores')
        );
    }
    render() { 
        const { suscriptor } = this.props;
        if(!suscriptor) return <Spinner/>
        return ( 
             <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/suscriptores'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user"></i>{' '}
                        Editar Suscriptor
                    </h2>
                    <div className="container">
                        <form onSubmit={(event) => this.agregarSuscriptor(event,suscriptor.id)}>
                            <div className="form-group">
                                <label>Nombre: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    placeholder="Nombre del Suscriptor"
                                    required
                                    ref={this.suscriptorRef.nombre}
                                    defaultValue={suscriptor.nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellido: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="apellido"
                                    placeholder="Apellido del Suscriptor"
                                    required
                                    ref={this.suscriptorRef.apellido}
                                    defaultValue={suscriptor.apellido}
                                />
                            </div>
                            <div className="form-group">
                                <label>Carrera: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="carrera"
                                    placeholder="Carrera del Suscriptor"
                                    required
                                    ref={this.suscriptorRef.carrera}
                                    defaultValue={suscriptor.carrera}
                                />
                            </div>
                            <div className="form-group">
                                <label>Codigo: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="codigo"
                                    placeholder="Codigo del Suscriptor"
                                    required
                                    ref={this.suscriptorRef.codigo}
                                    defaultValue={suscriptor.codigo}
                                />
                            </div>
                            <input 
                                type="submit"
                                value="Editar Suscriptor"
                                className="btn btn-success"
                            />
                        </form>
                    </div>
                </div>
             </div>
        );
    }
}
EditarSuscriptor.propTypes= {
    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [
        {
            collection: 'suscriptores',
            storeAs: 'suscriptor',
            doc: props.match.params.id
        }
    ]),
    connect(({firestore: {ordered}},props) => ({
        suscriptor: ordered.suscriptor && ordered.suscriptor[0]
    }))
)(EditarSuscriptor);