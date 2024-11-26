import StepperStatus from "@/components/dashboardCustomer/StepperStatus"
import useChangeOrde from "@/hooks/useChangeOrde"
import { deliveryTypeTraslatios, paymentMethodTraslatios } from "@/locales/es."
import { OrderListForDelivery } from "@/types/index"
import { deliveryPrice, formatCurrencyCOP, formatDateTimeLarge } from "@/utils/index"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import OrderDetailsDeliveryManData from "./OrderDetailsDeliveryManData"

type OrderDeliveryManProps = {
    order: OrderListForDelivery
}

function OrderDeliveryMan({order} : OrderDeliveryManProps) {

    const navigate = useNavigate()
    const {mutate, isPending} = useChangeOrde()

    const total = order.orderDetails.reduce((acc, item) => acc + item.quantity * +item.product.priceAfter,0)
    const totalItems = order.orderDetails.reduce((acc, item) => item.quantity + acc,0)
    const isDelivery = total <= 50000 && order.deliveryType === 'delivery'
    
    return (
        <>
        <div className="w-full p-3 space-y-4 font-medium border-4 rounded-lg border-principal">
            <div className="flex justify-between font-semibold">
                <p>#{order.id}</p>
                <p>{formatDateTimeLarge(order.createdAt)}</p>
            </div>
            {order.status !== 'cancel' ?
                <div className="w-full mx-auto">
                    <StepperStatus 
                        status={order.status}
                        deliveryType={order.deliveryType}
                    />
                </div> :
                <div>
                    <h2 className="text-2xl font-bold uppercase text-principal">Orden Cancelada</h2>
                </div>
            }
            

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
            
            {
                order.customer && 
                <div className="flex flex-col flex-wrap justify-between space-y-3 text-sm font-semibold md:text-base">
                    <p className="">Datos del Cliente</p>
                    <div className="flex flex-wrap justify-between text-sm font-semibold md:text-base">
                        <p>Nombre:</p>
                        <p className="capitalize text-slate-500">{order.customer.user.name}</p>
                    </div>
                    <div className="flex flex-wrap justify-between text-sm font-semibold md:text-base">
                        <p>Dirección:</p>
                        <p className="capitalize text-slate-500">{order.address}</p>
                    </div>
                    <div className="flex flex-wrap justify-between text-sm font-semibold md:text-base">
                        <p>Teléfono:</p>
                        <p className="text-slate-500">{order.customer.phone}</p>
                    </div>
                </div>
            }

            {
                order.request && 
                <div className="flex flex-col flex-wrap justify-between space-y-3 text-sm font-semibold md:text-base">
                    <p className="">Petición</p>
                    <p className="text-justify text-slate-500">{order.request}</p>

                </div>
            }
            
            <p className="font-semibold">Items: <span className="text-principal">{totalItems}</span></p>
            <p className="font-semibold">Total: <span className="text-principal">{formatCurrencyCOP(isDelivery ? total + deliveryPrice : total)}</span></p>

            <div className="flex flex-col gap-3 md:flex-row">
                <Button
                    variant="outlined"
                    fullWidth
                    color="error"
                    disabled={order.status === 'return'}
                    onClick={() =>{ 
                        navigate(location.pathname + `?viewOrder=${order.id}`)
                    }}
                >
                    Ver
                </Button>
                
                {order.status !== 'completed' &&
                    <Button
                        variant="contained"
                        fullWidth
                        color="error"
                        disabled={order.status === 'completed' || isPending || order.status === 'return'}
                        onClick={() => mutate({orderId: order.id, status: 'return'},
                            {onSuccess(data) {
                                toast.success(data)
                            },}
                        )}
                    >
                        Devolución
                    </Button>
                }
            </div>
            <OrderDetailsDeliveryManData/>
        </div>
        </>
        
    )
}

export default OrderDeliveryMan