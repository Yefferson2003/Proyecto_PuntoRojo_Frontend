import { Link } from "react-router-dom"

function Footer() {
    return (
        <div className="flex justify-center w-full mb-3 text-2xl font-bold text-center">

            <footer className="w-11/12 p-4 text-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 bg-principal">
            <span className="text-sm sm:text-center">Todos los Derechos Reservados {new Date().getFullYear()}@
            <p className="mt-3">Horario de Atención: Lunes a Sabado - 8 am --- 6 pm | Domingos y Festivos - 9 am -- 12 pm  </p>
            </span>
                <ul className="flex flex-wrap items-center justify-center mt-3 co sm:mt-0">
                    <li>
                        <Link className="mr-4 text-sm hover:underline md:mr-6" to={'/about'}>Sobre Nosotros</Link>
                    </li>
                    <li>
                        <Link className="mr-4 text-sm hover:underline md:mr-6" to={'/polices/privacy'}>Politicas De Privacidad</Link>
                    </li>
                    <li>
                    <Link className="mr-4 text-sm hover:underline md:mr-6" to={'/polices/service'}>Politicas Del Servicio</Link>
                    </li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer