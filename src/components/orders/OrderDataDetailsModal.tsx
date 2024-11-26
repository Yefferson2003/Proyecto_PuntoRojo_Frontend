import { CartItem, Order } from "@/types/index"
import { deliveryPrice, formatCurrencyCOP } from "@/utils/index"
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction } from "react";

type OrderDataDetailsModalProps = {
    order: Order
    productos: CartItem[]
    setProductos: Dispatch<SetStateAction<CartItem[]>>
}

function OrderDataDetailsModal({order, productos, setProductos} : OrderDataDetailsModalProps) {


    const subtotal = productos.reduce((sum, item) => sum + +item.product.priceAfter * item.quantity, 0)
    // const total = order.orderDetails.reduce((acc, item) => acc + item.quantity * +item.product.priceAfter,0)
    const isDelivery = subtotal <= 50000 && order.deliveryType === 'delivery'
    const removeProduct = (productId: number) => {
        setProductos((prevProducts) => prevProducts.filter(item => item.product.id !== productId));
    };
    
    return (
        <div>
            <p className="my-5">Cantidad de items: <span className="font-bold text-principal">{order.orderDetails.length}</span></p>
            
            <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
                <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow sx={{ '& th': { color: '#ffffff' }, }} >
                        <TableCell sx={{ background: '#ff0000'}}></TableCell>
                        <TableCell sx={{ background: '#ff0000'}}>Código de Barra</TableCell>
                        <TableCell sx={{ background: '#ff0000', width: 500}}>Producto</TableCell>
                        <TableCell sx={{ background: '#ff0000'}}>Precio</TableCell>
                        <TableCell align="center" sx={{ background: '#ff0000'}}>Cantidad</TableCell>
                        <TableCell sx={{ background: '#ff0000'}}>Total</TableCell>
                        {order.status === 'return' && <TableCell sx={{ background: '#ff0000', width: 40}}></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody sx={{ maxHeight: 440 }}>
                    {productos.map((item) => (
                        <TableRow
                            key={item.product.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" sx={{width: 'full'}}>
                                <img className="max-w-[30px]" src={item.product.imgUrl} alt={item.product.name} />
                            </TableCell>
                            <TableCell><p>{item.product.nit}</p></TableCell>
                            <TableCell><p>{item.product.name}</p></TableCell>
                            <TableCell><p>{formatCurrencyCOP(+item.product.priceAfter)}</p></TableCell>
                            <TableCell align="center"><p>{item.quantity}</p></TableCell>
                            <TableCell><p>{formatCurrencyCOP(item.quantity * +item.product.priceAfter)}</p></TableCell>
                            {order.status === 'return' && 
                                <TableCell>
                                    <Tooltip title='Eliminar Producto' placement="left">
                                    <IconButton onClick={() => removeProduct(item.product.id)}>
                                        <CloseIcon/>
                                    </IconButton>  
                                    </Tooltip>
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                    {isDelivery &&
                    <TableRow 
                        sx={{
                            '& > *': { color: 'red'}
                        }}
                    >
                        <TableCell colSpan={3}/>
                        <TableCell colSpan={2}>Domicilio</TableCell>
                        <TableCell>{formatCurrencyCOP(deliveryPrice)}</TableCell>
                        {order.status === 'return' && <TableCell></TableCell>}
                    </TableRow>
                    }
                    <TableRow
                        sx={{
                            '& > *': { color: 'red'}
                        }}
                    >
                        <TableCell colSpan={3}/>
                        <TableCell>Subtotal</TableCell>
                        <TableCell align="center">
                            {order.orderDetails.reduce((acc, item) => acc + item.quantity, 0)}
                        </TableCell>
                        <TableCell>{formatCurrencyCOP(isDelivery ? subtotal + deliveryPrice: subtotal)}</TableCell>
                        {order.status === 'return' && <TableCell></TableCell>}
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
    }

export default OrderDataDetailsModal