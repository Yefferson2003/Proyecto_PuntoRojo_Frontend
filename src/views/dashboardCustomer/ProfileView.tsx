import LogoBgWhite from "@/components/logos/LogoBgWhite";
import { clientTypeTraslatios } from "@/locales/es.";
import { Customer } from "@/types/index";
import { Button } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import EditCustomerModal from "../../components/dashboardCustomer/EditCustomerModal";
import UpdatePassword from "../../components/dashboardCustomer/UpdatePassword";

function ProfileView() {
    const data : Customer = useOutletContext();

    const navigate = useNavigate()
    return (
        <>
            <div className="flex flex-col flex-wrap w-full gap-5 md:mt-5 max-w-[500px] mx-auto">
                <div className="text-center lg:basis-full">
                    <h1 id='tittle-profile' className="text-4xl font-semibold uppercase text-principal">Mi Perfil</h1>
                </div>
                
                <section className="px-5 py-3 space-y-3 text-center bg-white rounded-lg shadow-xl">
                    <div className="w-[150px] mx-auto md:hidden">
                        <LogoBgWhite/>
                    </div>
                    <h1 className="text-xl font-bold capitalize">
                        {data.user.name}
                    </h1>
                    <p className="text-slate-500">
                        {data.user.email}
                    </p>

                    <Button variant="contained"
                        color="error"
                        onClick={() => navigate(location.pathname + `?editCustomer=${data.id}`)}
                    >
                        Editar Perfil
                    </Button>
                </section>

                <section className="px-5 py-2 space-y-2 text-center bg-white rounded-lg shadow-xl " >
                    <h2 className="text-xl font-semibold">
                        Datos Personales
                    </h2>

                    <div className="space-y-1 *:flex *:justify-between">
                        <div className="flex justify-between">
                            <p className="font-medium">Tipo de Persona:</p>
                            <p className="text-slate-500">{data.clietType && clientTypeTraslatios[data.clietType]}</p>
                        </div>
                        <div>
                            <p className="font-medium">{data.clietType === 'natural' ? 
                                'C.C' : 
                                'NIT'
                            }:</p>
                            <p className="text-slate-500">{data.identification}</p>
                        </div>
                        <div>
                            <p className="font-medium">Teléfono:</p>
                            <p className="text-slate-500">{data.phone}</p>
                        </div>
                        <div>
                            <p className="font-medium">Dirección:</p>
                            <p className="capitalize text-slate-500">{data.address}</p>
                        </div>
                    </div>
                </section>
                
                <UpdatePassword/>
                
            </div>
            {data && <EditCustomerModal customer={data}/>}
        </>
    )
}

export default ProfileView