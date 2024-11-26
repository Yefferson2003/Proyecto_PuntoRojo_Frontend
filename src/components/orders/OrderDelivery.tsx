import { OrderList } from "@/types/index"
import OrderListTable from "./OrderListTable"

type OrderDeliveryProps = {
    orders: OrderList[]
}

function OrderDelivery({orders} : OrderDeliveryProps) {
    return (
        <section className="space-y-3">
        
        <p className=" text-wrap">Aquí podras ver los pedidos de tipo de entrega
            <span className="text-principal"> Domicilio</span>, los podras 
            <span className="text-principal"> Revisar</span>, 
            <span className="text-principal"> Empacar</span> y mas adelante asignar un 
            <span className="text-principal"> Repartidor</span>
        </p>
        
        <OrderListTable rows={orders}/> 
        </section>
    )
}

export default OrderDelivery