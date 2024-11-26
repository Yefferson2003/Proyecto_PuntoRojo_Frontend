import { useQuery } from "@tanstack/react-query";
import OrderModal from "./OrderModal";
import { getOrder } from "@/api/OrderApi";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function OrderData() {

    const location = useLocation();
    const [orderId, setOrderId] = useState<number>(0);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const orderModal = queryParams.get('viewOrder');
        const id = orderModal ? Number(orderModal) : 0;
        setOrderId(id);
    }, [location.search]);


    const { data, isError } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrder({ orderId }),
        enabled: !!orderId 
    });

    if (isError) return <Navigate to={'/404'} />;
    if (data) return <OrderModal order={data} />;
}

export default OrderData;
