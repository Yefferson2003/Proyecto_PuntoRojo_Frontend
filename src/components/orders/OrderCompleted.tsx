import { OrderList } from "@/types/index"
import OrderListTable from "./OrderListTable"

type OrderCompletedProps = {
    orders: OrderList[]
}

function OrderCompleted({orders} : OrderCompletedProps) {
    return (
        <section className="space-y-3">
        
        <p className=" text-wrap">Aquí podras ver los pedidos <span className="text-principal"> Completados</span> recientementes
        </p>
        
        <OrderListTable rows={orders}/> 
        </section>
    )
}

export default OrderCompleted