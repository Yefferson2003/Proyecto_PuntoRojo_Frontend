import { getOrdersByCustomerById } from "@/api/CustomerApi"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import OrderDetailsModal from "./OrderDetailsModal"

function OrderDetailsData() {

    const queryParams = new URLSearchParams(location.search)
    const modalOrder = queryParams.get('viewOrder')
    const orderId = Number(modalOrder)

    const {data, isError} = useQuery({
        queryKey: ['orderDetailsForCustomer', orderId],
        queryFn: () => getOrdersByCustomerById(orderId),
        enabled: !!orderId
    })

    if (isError) return <Navigate to={'/404'}/>
    if (data) return <OrderDetailsModal order={data}/>
}

export default OrderDetailsData