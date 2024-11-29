import useChangeOrde from "@/hooks/useChangeOrde";
import { deliveryTypeTraslatios, paymentMethodTraslatios } from "@/locales/es.";
import socket from "@/socket/index";
import { useRootStore } from "@/stores/rootStore";
import { Customer, DeliveryMan, OrderDetailsForCustomer, SokectData } from "@/types/index";
import { deliveryPrice, formatCurrencyCOP, formatDateTimeLarge } from "@/utils/index";
import { Badge, Box, Button, Modal } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCloseModal from "../ButtonCloseModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    maxWidth: '100vw',
    bgcolor: '#f1f5f9',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '95vh',  // Altura máxima en porcentaje de la pantalla
    overflowY: 'auto',
};

type OrderDetailsModalProps = {
    isDeliveryMan?: boolean
    order: OrderDetailsForCustomer
}

type ContextType = DeliveryMan | Customer

function OrderDetailsModal({isDeliveryMan, order} : OrderDetailsModalProps) {

    const copyCart = useRootStore((state) => state.copyCart)
    const context = useOutletContext<ContextType>();

     // MODAL //
    const navigate = useNavigate(); 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalOrder = queryParams.get('viewOrder')
    const show = modalOrder ? true : false;

    const total = order.orderDetails.reduce((acc, item) => acc + item.quantity * +item.product.priceAfter,0)
    const totalItems = order.orderDetails.reduce((acc, item) => item.quantity + acc,0)
    const isDelivery = total <= 50000 && order.deliveryType === 'delivery'

    const queryClient = useQueryClient()
    const {mutate, isPending} = useChangeOrde()

    useEffect(() => {
        const handleChangeOrder = (data : SokectData) => {
            if (data.orderId === order.id) {
                queryClient.invalidateQueries({ queryKey: ['orderDetailsForCustomer', data.orderId] });
                queryClient.invalidateQueries({ queryKey: ['orderDetailsForDeliveryMan', data.orderId ] });
            }
        };
    
        socket.on('changeOrder', handleChangeOrder);
    
        return () => {
            socket.off('changeOrder', handleChangeOrder);
        };
    }, [queryClient, context.id, order.id]);
    
    return (
        <Modal
            open={show}
            onClose={() => {
                navigate(location.pathname, {replace: true})
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <ButtonCloseModal/>

            <h2 className="mb-5 text-2xl font-bold text-center text-principal">Lista de Productos</h2>
            

            <div className="flex justify-between mb-5 text-xl font-bold">
                <p>#{order.id}</p>
                <p>{formatDateTimeLarge(order.createdAt)}</p>
            </div>

            <div className="flex justify-between">
                <div>
                    <p className="font-semibold">Tipo de entrega</p>
                    <p className="text-slate-500">{deliveryTypeTraslatios[order.deliveryType]}</p>
                </div>

                <div className="text-end">
                    <p className="font-semibold">Metodo de Pago</p>
                    <p className="text-slate-500">{paymentMethodTraslatios[order.paymentMethod]}</p>
                </div>
            </div>

            <section className="w-full px-1 pt-3 mt-2 text-sm bg-white divide-y divide-gray-300 rounded-md md:px-5 md:text-base">
            {order.orderDetails.map((item, index) => (
                <div key={index} 
                    className={`flex items-center justify-between gap-1 `}
                >
                    <Badge color="error" badgeContent={item.quantity}>
                        <img className="w-[40px]" src={item.product.imgUrl} alt={item.product.name} />
                    </Badge>

                    <div className="text-center">
                        <p className="mb-1 capitalize text-wrap">{item.product.name}</p>
                        
                        <p className="font-bold">{formatCurrencyCOP(+item.product.priceAfter)}</p>
                        
                    </div>

                    <div>
                        <p className="font-bold text-principal">{formatCurrencyCOP(item.quantity * +item.product.priceAfter)}</p>
                    </div>
                </div>
            ))}
            </section>
            
            <div className="px-1 mb-5 font-bold bg-red-200 md:px-5">
                <div className="flex justify-between">
                    <p>Items:</p>
                    <p>{totalItems}</p>
                </div>

                <div className="flex justify-between">
                    <p>Total:</p>
                    <p>{formatCurrencyCOP(total)}</p>
                </div>
                
                <div className="flex justify-between">
                    <p>Domicilio:</p>
                    <p>{
                        order.deliveryType === 'pickup' ? 
                        'No Aplica' : order.deliveryType === 'delivery' && isDelivery ? 
                        formatCurrencyCOP(deliveryPrice) : formatCurrencyCOP(0)
                    }</p>
                </div>
                
                <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <p className="text-principal">{isDelivery ? 
                        formatCurrencyCOP(total+deliveryPrice): formatCurrencyCOP(total)
                    }</p>
                </div>
            </div>

            {order.completedAt && 
                <h2 className="my-5 text-xl font-bold text-center ">
                    Completado: <span className="text-principal">{formatDateTimeLarge(order.completedAt)}</span>
                </h2>
            }

            { (order.status === 'completed' && !isDeliveryMan) && 
                <Button
                    variant="contained"
                    color='error'
                    fullWidth
                    onClick={() => {
                        copyCart(order.orderDetails)
                        toast.success('Productos agregados al carrito')
                        navigate(location.pathname, {replace: true})
                    }}
                >
                    Copiar Items
                </Button>
            }

            {isDeliveryMan && 
                <Button
                    variant="contained"
                    color='error'
                    fullWidth
                    disabled={isPending || order.status !== 'sending'}
                    onClick={() =>{
                        mutate({orderId: order.id, status: 'completed'},
                            {onSuccess(data) {
                                toast.success(data)
                            },})
                            navigate(location.pathname, {replace: true}
                        )}}
                >
                    Completar Pedido
                </Button>
            }
            </Box>
        </Modal>
    )
}

export default OrderDetailsModal