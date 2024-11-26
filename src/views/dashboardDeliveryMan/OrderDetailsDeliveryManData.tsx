import { getOrdersByDeliveryManById } from "@/api/DeliveryManApi"
import OrderDetailsModal from "@/components/dashboardCustomer/OrderDetailsModal"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"

function OrderDetailsDeliveryManData() {

    const queryParams = new URLSearchParams(location.search)
    const modalOrder = queryParams.get('viewOrder')
    const orderId = Number(modalOrder)

    const {data, isError} = useQuery({
        queryKey: ['orderDetailsForDeliveryMan', orderId],
        queryFn: () => getOrdersByDeliveryManById(orderId),
        enabled: !!orderId
    })

    if (isError) return <Navigate to={'/404'}/>
    if (data) return <OrderDetailsModal isDeliveryMan={true} order={data}/>
}

export default OrderDetailsDeliveryManData