import AddDeliveryModal from "@/components/dashboardAdmin/delivery/AddDeliveryModal"
import DeliveryList from "@/components/dashboardAdmin/delivery/DeliveryList"
import ViewOrderOfDeliveryData from "@/components/dashboardAdmin/delivery/ViewOrderOfDeliveryData"
import Loader from "@/components/Loader"
import { useDelivery } from "@/hooks/useDelivery"
import socket from "@/socket/index"
import { Button } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


function DeliverysView() {

    const navigate = useNavigate()
    const {deliveryMen, isLoading} = useDelivery()
    const queryClient = useQueryClient()

    useEffect(() => {
        socket.on('changeAvailabilityDeliveryMan', () => {
            queryClient.invalidateQueries({ queryKey: ['deliveries'] });
        });
    
        return () => {
            socket.off('changeAvailabilityDeliveryMan');
        };
    }, [queryClient]);

    return (
        <section className="w-full">
            <h1 className="text-4xl font-bold text-center uppercase text-principal">Repartidores</h1>
            <p className="mt-3 text-lg">Aquí podrás visualizar, crear y administrar los <span className="font-bold text-principal">Repartidores</span></p>

            <Button
                id="button-add-deliveryMan"
                sx={{ marginTop: '20px' }}
                onClick={() => navigate(location.pathname + '?newDelivery=true')}
                color="error"
                variant="contained"
            >
                Agregar Repartidor
            </Button>

            <h2 className="my-5 text-3xl">Lista de Repartidores</h2>

            {isLoading && <Loader/>}
            {deliveryMen &&
                <DeliveryList deliveryMen={deliveryMen}/>
            }
            <ViewOrderOfDeliveryData/>
            <AddDeliveryModal/>
        </section>
    )
}

export default DeliverysView