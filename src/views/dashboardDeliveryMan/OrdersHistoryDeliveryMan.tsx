import { getOrdersByDeliveryMan } from "@/api/DeliveryManApi";
import Loader from "@/components/Loader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Pagination } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import OrderDeliveryMan from "./OrderDeliveryMan";
import socket from "@/socket/index";

function OrdersHistoryDeliveryMan() {

    const [page, setPage] = useState<number>(1);
    const [rowsPerPage] = useState<number>(5);

    const queryClient = useQueryClient()
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['ordersByDeliveryManHistory', page, rowsPerPage],
        queryFn: () => getOrdersByDeliveryMan({params: {page, limit: rowsPerPage}})
    })

    useEffect(() => {
        const handleChangeOrder = () => {
            queryClient.invalidateQueries({ queryKey: ['ordersByDeliveryManHistory', page, rowsPerPage] });
        };
    
        const handleAssignDeliveryMan = () => {
            queryClient.invalidateQueries({ queryKey: ['ordersByDeliveryManHistory', page, rowsPerPage] });
        };
    
        socket.on('changeOrder', handleChangeOrder);
        socket.on('assignDeliveryMan', handleAssignDeliveryMan);
    
        return () => {
            socket.off('changeOrder', handleChangeOrder);
            socket.off('assignDeliveryMan', handleAssignDeliveryMan);
        };
    }, [queryClient, page, rowsPerPage]);

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);

        refetch()
    };
    
    return (
        <div>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <h2 className="text-xl font-semibold">
                    Historial de Ordenes
                </h2>
            </AccordionSummary>
            <AccordionDetails
                sx={{textAlign: "center"}}
            >
                {isLoading && <Loader/>}
                {data && data.orders.map(order => (
                        <OrderDeliveryMan 
                            key={order.id} 
                            order={order}
                        />
                    ))
                }
                { data && <Pagination
                    onChange={handlePageChange}
                    page={page}
                    count={data.totalPages}
                    sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                />}
            </AccordionDetails>
                        
            
        </Accordion>
        </div>
    )
}

export default OrdersHistoryDeliveryMan