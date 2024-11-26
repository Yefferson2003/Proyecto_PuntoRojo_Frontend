import { OrderList } from "@/types/index"
import OrderListTable from "./OrderListTable"
type OrderInReviewProps = {
    orders: OrderList[]
}

function OrderInReview({orders}: OrderInReviewProps) {
    return (
        <section className="space-y-3">
        
        <p>Aquí podras ver los pedidos, <span className="capitalize text-principal">aceptarlos</span> o <span className="capitalize text-principal">rechazarlos</span>, e iniciar el proceso de <span className="capitalize text-principal">despacho</span></p>
        
        <OrderListTable rows={orders}/> 
        </section>
    )
}

export default OrderInReview