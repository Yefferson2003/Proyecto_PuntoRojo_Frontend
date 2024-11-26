import { getOrdersByCustomer } from "@/api/CustomerApi"
import OrderCustomer from "@/components/dashboardCustomer/OrderCustomer"
import OrdersHistoryCustomer from "@/components/dashboardCustomer/OrdersHistoryCustomer"
import Loader from "@/components/Loader"
import socket from "@/socket/index"
import { Customer, SokectData } from "@/types/index"
import { Pagination } from "@mui/material"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

function OrdersCustomerView() {

    const [page, setPage] = useState<number>(1);
    const [rowsPerPage] = useState<number>(3);

    const customerData : Customer = useOutletContext();

    const queryClient = useQueryClient()
    const {data, isLoading} = useQuery({
        queryKey: ['ordersByCustomer', page, rowsPerPage],
        queryFn: () => getOrdersByCustomer({overToday: 'true',page, limit: rowsPerPage})
    })

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    useEffect(() => {
        const handleChangeOrder = (data: SokectData) => {
            if (data.customerId === customerData.id) {
                queryClient.invalidateQueries({ queryKey: ['ordersByCustomer'] });
            }
        };
    
        const handleAssignDeliveryMan = (data: SokectData) => {
            if (data.customerId === customerData.id) {
                queryClient.invalidateQueries({ queryKey: ['ordersByCustomer'] });
            }
        };
    
        socket.on('changeOrder', handleChangeOrder);
        socket.on('assignDeliveryMan', handleAssignDeliveryMan);
    
        return () => {
            socket.off('changeOrder', handleChangeOrder);
            socket.off('assignDeliveryMan', handleAssignDeliveryMan);
        };
    }, [queryClient, customerData.id]);
    
    
    return (
        <section className="w-full space-y-5 md:mt-5 max-w-[1000px] mx-auto">
            <h1 id="tittle-orders" className="text-4xl font-semibold text-center uppercase text-principal">Mis Pedidos</h1>
            
            <div className="px-5 py-3 space-y-3 text-center bg-white rounded-lg shadow-xl">
                {isLoading && <Loader/>}
                {data && data.orders.length === 0 && (
                    <p className="text-xl font-semibold">No hay órdenes aún</p>
                )}

                {data && data.orders.length > 0 && (
                    data.orders.map(order => (
                        <OrderCustomer 
                            key={order.id} 
                            order={order}
                            page={page}
                            rowsPerPage={rowsPerPage}
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
            <OrdersHistoryCustomer/>
            
        </section>
        
    )
}

export default OrdersCustomerView