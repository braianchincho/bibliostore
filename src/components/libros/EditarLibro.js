import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types';

class EditarLibro extends Component {
    state = { loading: false }
    libroRef = {
        titulo: React.createRef(),
        ISBN: React.createRef(),
        editorial: React.createRef(),
        existencia: React.createRef()
    }
    editarLibro = e => {
        e.preventDefault();

        const libroEditado = {
            titulo: this.libroRef.titulo.current.value,
            ISBN: this.libroRef.ISBN.current.value,
            editorial: this.libroRef.editorial.current.value,
            existencia: this.libroRef.existencia.current.value,
        }
        const { firestore, history, libro } = this.props;
        this.setState({loading: true})
        firestore.update({
            collection: 'libros',
            doc: libro.id
        },libroEditado).then(
            res => { 
                history.push('/')
            }
        ).catch(res => {
            this.setState({loading:false})
        });
    };
    render() { 
        const { libro } = this.props;
        if(!libro || this.state.loading) return <Spinner/>
        
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
                        Editar Libro
                    </h2>
                    <div className="container">
                        <form onSubmit={this.editarLibro}>
                            <div className="form-group">
                                <label>Titulo: </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="titulo"
                                    placeholder="Titulo de libro"
                                    required
                                    ref={this.libroRef.titulo}
                                    defaultValue={libro.titulo}
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
                                    ref={this.libroRef.ISBN}
                                    defaultValue={libro.ISBN}
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
                                    ref={this.libroRef.editorial}
                                    defaultValue={libro.editorial}
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
                                    ref={this.libroRef.existencia}
                                    defaultValue={libro.existencia}
                                />
                            </div>
                            <input 
                                type="submit"
                                value="EditarLibro"
                                className="btn btn-success"
                            />
                        </form>
                    </div>
                </div>
             </div>
        );
    }
}
 
EditarLibro.propTypes= {
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
)(EditarLibro);