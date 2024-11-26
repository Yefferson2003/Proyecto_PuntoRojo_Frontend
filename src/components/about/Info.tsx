import React from 'react';
import MapIcon from '@mui/icons-material/Map';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Link } from 'react-router-dom';

const Info: React.FC = () => {
    const phoneNumber = '3174299424'; 
    const message = '¡Hola! Me gustaría saber más sobre su servicio.'; 
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className='flex flex-col items-center justify-center py-5 mt-10 font-bold text-center text-white capitalize md:justify-around bg-principal md:flex-row gap-y-5 '>
            <div className='flex items-center gap-2 cursor-pointer'>
                <MapIcon fontSize='large'/>
                <Link to={'/map'}>
                    <p>Nuestro Alcanze</p>
                </Link>
            </div>

            
            <div className='flex items-center gap-2 cursor-pointer'>
                <PhoneAndroidIcon fontSize='large'/>
                <div>
                    <p>Domicilios </p>
                    <Link to={whatsappLink} target="_blank" rel="noopener noreferrer">
                        3174299424
                    </Link>
                </div>
                
            </div>
            <div className='flex items-center gap-2'>
                <LocalOfferIcon fontSize='large'/>
                <div className=''>
                    <p className=''>nuestros precios <br /> incluyen IVA</p>
                </div>
                
            </div>
                

            
        </div>
    );
};

export default Info;