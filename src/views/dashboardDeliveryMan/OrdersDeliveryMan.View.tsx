import { getOrdersByDeliveryMan } from "@/api/DeliveryManApi";
import Loader from "@/components/Loader";
import socket from "@/socket/index";
import { Pagination } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import OrderDeliveryMan from "./OrderDeliveryMan";
import OrdersHistoryDeliveryMan from "./OrdersHistoryDeliveryMan";
import { DeliveryMan, SokectData } from "@/types/index";

function OrdersDeliveryManView() {

    const [page, setPage] = useState<number>(1);
    const [rowsPerPage] = useState<number>(3);

    const deliveryManData : DeliveryMan = useOutletContext();
    
    const queryClient = useQueryClient()
    const {data, isLoading} = useQuery({
        queryKey: ['ordersByDeliveryMan', page, rowsPerPage],
        queryFn: () => getOrdersByDeliveryMan({params: {overToday: 'true', page, limit: rowsPerPage}})
    })

    useEffect(() => {
        const handleChangeOrder = (data : SokectData) => {
            if (data.deliveryManId === deliveryManData.id) {
                queryClient.invalidateQueries({ queryKey: ['ordersByDeliveryMan', page, rowsPerPage] });
            }
        };
    
        const handleAssignDeliveryMan = (data: SokectData) => {
            if (data.deliveryManId === deliveryManData.id) {
                queryClient.invalidateQueries({ queryKey: ['ordersByDeliveryMan', page, rowsPerPage] });
            }
        };
    
        socket.on('changeOrder', handleChangeOrder);
        socket.on('assignDeliveryMan', handleAssignDeliveryMan);
    
        return () => {
            socket.off('changeOrder', handleChangeOrder);
            socket.off('assignDeliveryMan', handleAssignDeliveryMan);
        };
    }, [queryClient, page, rowsPerPage, deliveryManData.id]);
    
    

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    return (
        <section className="w-full space-y-5 md:mt-5 max-w-[1000px] mx-auto">
            <h1 id="tittle-orders" className="text-4xl font-semibold text-center uppercase text-principal">Pedidos por entregar</h1>
            
            <div className="px-5 py-3 space-y-3 text-center bg-white rounded-lg shadow-xl">
                {isLoading && <Loader/>}
                {data && data.orders.length === 0 && (
                    <p className="text-xl font-semibold">No hay órdenes aún</p>
                )}

                {data && data.orders.length > 0 && (
                    data.orders.map(order => (
                        <OrderDeliveryMan 
                            key={order.id} 
                            order={order}
                        />
                    ))
                )}
            </div>
            {data && 
                <Pagination
                    onChange={handlePageChange}
                    page={page}
                    count={data.totalPages}
                    sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                />
            }
            <OrdersHistoryDeliveryMan/>
        </section>
    )
}

export default OrdersDeliveryManView