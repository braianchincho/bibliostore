import React from 'react';
const FichaSuscriptor = ({alumno}) => {
    if(!alumno) return null;
    return (  
        <div className="card">
            <h3 className="card-header bg-primary text-white">
                Datos del solicitante        
            </h3>
            <div className="card-body">
                <p className="font-weight-bold">Nombre {' '}
                    <span className="font-weight-normal">{alumno.apellido}{' '}{alumno.nombre}</span>
                </p>
                <p className="font-weight-bold">Codigo {' '}
                    <span className="font-weight-normal">{alumno.codigo}</span>
                </p>
                <p className="font-weight-bold">Carrera {' '}
                    <span className="font-weight-normal">{alumno.carrera}</span>
                </p>
            </div>
        </div>
    );
}
 
export default FichaSuscriptor;