
import { Pagination } from "@mui/material"
import OrderHistoryCustomer from "./OrderHistoryCustomer"
import { OrderListForCustomer } from "@/types/index"

type OrdersListHistoryCustomerProps = {
    orders: OrderListForCustomer[]
    count: number
    page: number
    handlePageChange: (event: unknown, newPage: number) => void
}

function OrdersListHistoryCustomer({orders, count, page, handlePageChange}:OrdersListHistoryCustomerProps) {
    return (
        <div>
            {orders.map(order => (
                <OrderHistoryCustomer key={order.id} order={order}/>
            ))}

            <Pagination
                onChange={handlePageChange}
                page={page}
                count={count}
                sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
            />
        </div>
    )
}

export default OrdersListHistoryCustomer