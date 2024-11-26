import { deliveryTypeTraslatios, paymentMethodTraslatios } from "@/locales/es."
import { OrderListForCustomer } from "@/types/index"
import { deliveryPrice, formatCurrencyCOP, formatDateTimeLarge } from "@/utils/index"
import { Button } from "@mui/material"
import OrderDetailsData from "./OrderDetailsData"
import { useNavigate } from "react-router-dom"

type OrderCustomerProps = {
    order: OrderListForCustomer
}

function OrderHistoryCustomer({order} : OrderCustomerProps) {

    const navigate = useNavigate()

    const total = order.orderDetails.reduce((acc, item) => acc + item.quantity * +item.product.priceAfter,0)
    const totalItems = order.orderDetails.reduce((acc, item) => item.quantity + acc,0)
    const isDelivery = total <= 50000 && order.deliveryType === 'delivery'
    
    return (
        <>
        <div className="w-full p-3 space-y-5 font-medium border-4 rounded-lg border-principal">
            <div className="flex justify-between font-semibold">
                <p>#{order.id}</p>
                <p>{formatDateTimeLarge(order.createdAt)}</p>
            </div>

            <div className="flex justify-between text-sm font-semibold md:text-base">
                <p>Tipo de Entrega:</p>
                <p className="text-slate-500">{deliveryTypeTraslatios[order.deliveryType]}</p>
            </div>
            
            <div className="flex justify-between text-sm font-semibold md:text-base">
                <p>Metodo de Pago:</p>
                <p className="text-slate-500">{paymentMethodTraslatios[order.paymentMethod]}</p>
            </div>
            
            <div className="flex justify-between text-sm font-semibold md:text-base">
                <p>Domicilio:</p>
                <p className="text-slate-500">{
                    order.deliveryType === 'pickup' ? 
                    'No Aplica' : order.deliveryType === 'delivery' && isDelivery ? 
                    formatCurrencyCOP(deliveryPrice) : formatCurrencyCOP(0)
                }</p>
            </div>

            
            <div className="flex justify-between text-sm font-semibold md:text-base">
                <p>Completado:</p>
                <p className="text-slate-500">{order.completedAt && formatDateTimeLarge(order.completedAt)}</p>
            </div>
            
            {
                order.deliveryMan && 
                <div className="flex justify-between text-sm font-semibold md:text-base">
                    <p>Repartidor:</p>
                    <p className="text-slate-500">{order.deliveryMan.user.name}</p>
                </div>
            }
            

            
            <p className="font-semibold text-center">Items: <span className="text-principal">{totalItems}</span></p>
            <p className="font-semibold text-center">Total: <span className="text-principal">{formatCurrencyCOP(isDelivery ? total + deliveryPrice : total)}</span></p>

            
            <div className="">
                <Button
                    variant="contained"
                    fullWidth
                    color="error"
                    onClick={() => navigate(location.pathname + `?viewOrder=${order.id}`)}
                >
                    Ver
                </Button>
            </div>
            <OrderDetailsData/>
        </div>
        </>
        
    )
}

export default OrderHistoryCustomer