import useChangeOrde from "@/hooks/useChangeOrde";
import { CartItem, Order } from "@/types/index";
import { formatDateTimeLarge } from "@/utils/index";
import { Box, Button, Divider, Modal } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressStatus from "./ProgressStatus";
import ButtonCloseModal from "../ButtonCloseModal";
import OrderDataCustomerModal from "./OrderDataCustomerModal";
import OrderDataDetailsModal from "./OrderDataDetailsModal";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: '#f1f5f9',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '95vh',  // Altura máxima en porcentaje de la pantalla
    minWidth: '90%',  // Altura máxima en porcentaje de la pantalla
    overflowY: 'auto',
};

type OrderModalProps  = {
    order: Order
    deliveryMan?: boolean
}

function OrderModal({order} : OrderModalProps) {

    const [productos, setProductos] = useState<CartItem[]>(order.orderDetails)

    const queryParams = new URLSearchParams(location.search)
    const modalOrder = queryParams.get('viewOrder')
    const show = modalOrder ? true : false
    
    
    const {mutate, updateOrderMutate, updateOrderMutateisPendig} = useChangeOrde()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    


    
    return (
        <Modal
            open={show}
            onClose={() => navigate(location.pathname, {replace: true})}
        >
            <Box sx={style}>
            <ButtonCloseModal/>

            <OrderDataCustomerModal order={order}/>

            <OrderDataDetailsModal order={order} productos={productos} setProductos={setProductos}/>
            
            {
                order.status !== 'completed' && 
                <Divider sx={{color: '#ff0000', my: '10px'}}>Acciones</Divider>
            
            }

            {( order.status === 'completed') && 
                <p className="mt-5 font-bold text-center capitalize" >Fecha de finalización:
                    <span className=' text-principal'> {order.completedAt && formatDateTimeLarge(order.completedAt)}
                    </span>
                </p>
            }

            {order.status === 'inReview' && (
                <div className="flex w-full gap-4">
                    <Button fullWidth
                        color="error"
                        variant="outlined"
                        onClick={() => {
                            mutate({orderId: order.id, status: 'cancel'})
                            navigate(location.pathname, { replace: true });
                        }}
                    >
                        Rechazar pedido
                    </Button>
                    <Button fullWidth
                        id="accept-order"
                        color="error"
                        variant="contained"
                        onClick={() => {
                            mutate({ orderId: order.id, status: 'pending' }); 
                            navigate(location.pathname, { replace: true });   
                        }}
                    >
                        Aceptar Pedido
                    </Button>
                </div>
            )}
            
            {(order.status !== 'inReview' && order.status !== 'completed' && order.status !== 'return') && (
                <ProgressStatus order={order}/>
            )}
            
            {(order.status == 'return') && (
                <div className="flex gap-4">
                    <Button fullWidth color='error' variant="outlined"
                        onClick={() => {
                            mutate({orderId: order.id, status: 'cancel'})
                            navigate(location.pathname, {replace: true})
                        }}
                    >Cancelar Pedido</Button>
                    <Button fullWidth color='error' variant="contained"
                        disabled={order.orderDetails.length == productos.length || updateOrderMutateisPendig}
                        onClick={() => {
                            
                            const deletedProducts = order.orderDetails.filter(
                                (originalItem) => !productos.some((item) => item.product.id === originalItem.product.id)
                            );

                            const deletedProductIds = deletedProducts.map((item) => item.product.id);
                            
                            updateOrderMutate({
                                orderId: order.id, 
                                status: 'pending', 
                                productIds: deletedProductIds
                            },
                            {
                                onSuccess: () => {
                                    queryClient.invalidateQueries({queryKey: ['order', order.id]})
                                    queryClient.invalidateQueries({queryKey: ['ordersToday']})
                                    navigate(location.pathname, { replace: true });
                                }
                            })
                        }}
                    >Repetir Pedido</Button>
                </div>
            )}
            </Box>
        </Modal>
    )
}

export default OrderModal