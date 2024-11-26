import { OrderList } from "@/types/index"
import OrderListTable from "./OrderListTable"

type OrderReturnProps = {
    orders : OrderList[]
}

function OrderReturn({orders} : OrderReturnProps) {
    return (
        <section className="space-y-3">
        
        <p className=" text-wrap">Aquí podras ver los pedidos en <span className="text-principal"> Devolución</span> para decidir entre <span className="text-principal"> Cancelar</span> o <span className="text-principal"> Modificar</span> el pedido
        </p>
        
        <OrderListTable rows={orders}/> 
        </section>
    )
}

export default OrderReturn