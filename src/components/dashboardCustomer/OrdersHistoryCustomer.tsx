import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getOrdersByCustomer } from "@/api/CustomerApi";
import OrdersListHistoryCustomer from "./OrdersListHistoryCustomer";
import Loader from "../Loader";

function OrdersHistoryCustomer() {

    const [page, setPage] = useState<number>(1);
    const [rowsPerPage] = useState<number>(5);

    const {data, isLoading, refetch} = useQuery({
        queryKey: ['ordersByCustomerHistory', page, rowsPerPage],
        queryFn: () => getOrdersByCustomer({page, limit: rowsPerPage})
    })

    const handlePageChange = (event: unknown, newPage: number) => {
        console.log(event);
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
            <AccordionDetails>
                {isLoading && <Loader/>}
                {data &&
                    <OrdersListHistoryCustomer
                        orders={data.orders}
                        count={data.totalPages}
                        page={page}
                        handlePageChange={handlePageChange}
                    />
                }
            </AccordionDetails>
        </Accordion>
        </div>
    )
}

export default OrdersHistoryCustomer