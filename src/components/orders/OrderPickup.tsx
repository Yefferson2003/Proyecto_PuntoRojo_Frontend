import { OrderList } from "@/types/index"
import OrderListTable from "./OrderListTable"

type OrderPickupProps = {
    orders: OrderList[]
}

function OrderPickup({orders} : OrderPickupProps ) {
    return (
        <section className="space-y-3 ">
        
        <p className="text-wrap">Aquí podras ver los pedidos de tipo de entrega
            <span className="text-principal"> Punto de Recogida</span>, los podras 
            <span className="text-principal"> Revisar</span>, 
            <span className="text-principal"> Empacar</span> para que este  
            <span className="text-principal"> Listo</span> para el cliente poder recogerlo y completar el pedido
        </p>
        
        <OrderListTable rows={orders}/> 
        </section>
    )
}

export default OrderPickup