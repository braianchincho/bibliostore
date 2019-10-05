import React from 'react';
import {BrowserRouter as Router, Route ,Switch } from 'react-router-dom'
import store from './store';
import { Provider } from 'react-redux';
import Suscriptores from './components/suscriptores/Suscriptores';
import MostrarSuscriptor from './components/suscriptores/Mostrarsuscriptor';
import NuevoSuscriptor from './components/suscriptores/NuevoSuscriptor';
import EditarSuscriptor from './components/suscriptores/EditarSuscriptor';
import NavBar from './components/layout/NavBar';
import Libros from './components/libros/Libros';
import NuevoLibro from './components/libros/NuevoLibro';
import MostrarLibro from './components/libros/MostrarLibro';
import EditarLibro from './components/libros/EditarLibro';

function App() {
  return (
    <Provider store={store}>
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Libros}/>
              <Route exact path="/libros/mostrar/:id" component={MostrarLibro}/>
              <Route exact path="/libros/nuevo" component={NuevoLibro}/>
              <Route exact path="/libros/editar/:id" component={EditarLibro}/>
              <Route exact path="/libros/prestamo/:id" component={Libros}/>
              <Route exact path="/suscriptores" component={Suscriptores}/>
              <Route exact path="/suscriptores/nuevo" component={NuevoSuscriptor}/>
              <Route exact path="/suscriptores/mostrar/:id" component={MostrarSuscriptor}/>
              <Route exact path="/suscriptores/editar/:id" component={EditarSuscriptor}/>
            </Switch>
          </div>
      </Router> 
    </Provider>
  );
}

export default App;
