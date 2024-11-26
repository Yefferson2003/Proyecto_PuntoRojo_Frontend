import React from 'react';
import { Link } from 'react-router-dom';

const Map: React.FC = () => {
    const aguachicaLink = "https://maps.app.goo.gl/Xe9wihYHh81raDLGA";
    
    return (
        
            <div className='bg-[#e0e0e0] mt-10 mx-auto py-8 px-10 rounded-lg w-4/5'>
                <div>
                    <h2 className='font-bold text-center uppercase text-principal'>Zonas de cobertura y Ubicación</h2>
                </div>
                <div className='mt-5 text-justify'>

                    <p>
                    <span className='font-bold text-principal'>Autoservicio Éxito Punto Rojo </span>
                    se compromete a realizar entregas exclusivamente dentro del área metropolitana del departamento del Cesar, <span className='font-bold'>( Aguachica, por un costo de $3.000 COP)</span>,  y en las zonas y lugares a los que tenga acceso de acuerdo con su red y por consiguiente podrá negarse a la aceptación de una oferta de compra cuando el domicilio registrado por el Cliente para realizar la entrega, no se encuentre dentro de las zonas geográficas habilitadas para tal efecto.
                    </p><br />
            
                    <p>
                    <span className='font-bold text-principal'>Tenga en cuenta</span> que no se realizarán entregas en zonas en las cuales hay <span className='font-bold'>restricción de acceso por orden publico</span>
                    </p><br />

                    <div className='font-bold'>
                        <h2 >Ubicación: Punto Rojo Aguachica, Cesar</h2>
                        <Link to={aguachicaLink} target="_blank" rel="noopener noreferrer"
                            className='underline text-principal'
                        >
                            Ver en Google Maps
                        </Link>
                    </div>
                </div>
            </div>
    );
};

export default Map;