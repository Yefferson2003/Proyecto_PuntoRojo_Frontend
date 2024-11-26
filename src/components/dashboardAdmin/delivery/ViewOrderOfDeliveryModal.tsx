import ButtonCloseModal from "@/components/ButtonCloseModal";
import { clientTypeTraslatios, deliveryTypeTraslatios, paymentMethodTraslatios, statusTraslations } from "@/locales/es.";
import { OrderListForDeliveryForAdmin } from "@/types/index";
import { deliveryPrice, formatCurrencyCOP, formatDateTime } from "@/utils/index";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: '#f1f5f9',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '95vh',  // Altura máxima en porcentaje de la pantalla
    overflowY: 'auto',
};

function Row(props: { order: OrderListForDeliveryForAdmin}) {

    const { order } = props;
    const [open, setOpen] = React.useState(false)

    const total = order.orderDetails.reduce((acc, item) => acc + item.quantity * +item.product.priceAfter,0)
    const isDelivery = total <= 50000 && order.deliveryType === 'delivery'

    return (
        <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' }, bgcolor: '#e2e8f0'}}>
            <TableCell component="th" scope="row">
                {formatDateTime(order.createdAt)}
            </TableCell>
            <TableCell>{order.address}</TableCell>
            <TableCell>{deliveryTypeTraslatios[order.deliveryType]}</TableCell>
            <TableCell>{paymentMethodTraslatios[order.paymentMethod]}</TableCell>
            <TableCell>{statusTraslations[order.status]}</TableCell>
            <TableCell 
                sx={{ width: '250px'}}
            >
                <p className="capitalize text-wrap">{order.customer.user.name}</p>
            </TableCell>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
        </TableRow>

        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <section className="flex justify-between gap-3 divide-x-8 *:px-2">
                    <div className="w-[450px]">
                        <h2 className="text-lg font-bold">Datos del Cliente</h2>

                        <p>Nombre: <span className="text-principal">{order.customer.user.name}</span></p>
                        <p>Tipo de Persona: <span className="text-principal">{order.customer.clietType && clientTypeTraslatios[order.customer.clietType]}</span></p>
                        <p>
                            {order.customer.clietType === 'natural' ? 
                                'C.C ' :
                                'NIT '
                            }
                        : <span className="text-principal">{order.customer.identification}</span></p>
                        <p>Teléfono: <span className="text-principal">{order.customer.phone}</span></p>
                        <p>Correo: <span className="text-principal">{order.customer.user.email}</span></p>
                        <p>Direccion: <span className="capitalize text-principal">{order.address}</span></p>
                        
                    </div>

                    <div className="max-h-[450px] w-full">
                        <h2 className="text-lg font-bold">Productos de la orden</h2>
                        <Table stickyHeader size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow 
                                sx={{
                                    '& > *': { color: 'red'}
                                }}
                            >
                                <TableCell/>
                                <TableCell>Código de Barra</TableCell>
                                <TableCell>Producto</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.orderDetails.map(item => (
                            <TableRow key={item.product.id}>
                                <TableCell component="th" scope="row">
                                    <img className="w-[32px]" src={item.product.imgUrl} alt={item.product.name} />
                                </TableCell>
                                <TableCell>{item.product.nit}</TableCell>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{formatCurrencyCOP(+item.product.priceAfter)}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{formatCurrencyCOP(item.quantity * +item.product.priceAfter)}</TableCell>
                            </TableRow>
                            ))}
                            {
                                (isDelivery) &&
                                <TableRow
                                    sx={{
                                        '& > *': { color: 'red'}
                                    }}
                                >
                                    <TableCell colSpan={3}/>
                                    <TableCell colSpan={2}>Domicilio</TableCell>
                                    <TableCell>{formatCurrencyCOP(deliveryPrice)}</TableCell>
                            </TableRow>
                            }
                            <TableRow
                                sx={{
                                    '& > *': { color: 'red'}
                                }}
                            >
                                <TableCell colSpan={3}/>
                                <TableCell>Subtotal</TableCell>
                                <TableCell>
                                    {order.orderDetails.reduce((acc, item) => acc + item.quantity, 0)}
                                    </TableCell>
                                <TableCell>{formatCurrencyCOP(isDelivery ? total + deliveryPrice: total)}</TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </div>
                </section>
                </Collapse>
            </TableCell>
        </TableRow>

    </React.Fragment>
    );
}

type ViewOrderOfDeliveryModalProps = {
    orders: OrderListForDeliveryForAdmin[]
    onPageChange: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
    totalOrders: number
    page: number
    rowsPerPage: number
}

function ViewOrderOfDeliveryModal({orders, onPageChange, handleChangeRowsPerPage, totalOrders, page, rowsPerPage} : ViewOrderOfDeliveryModalProps) {

    // MODAL //
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const modalProduct = queryParams.get('viewDelivery');
    const show = modalProduct ? true : false;

    return (
        <Modal
            open={show}
            onClose={() => navigate(location.pathname, {replace: true})}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <ButtonCloseModal/>
            <h2 className="mb-2 text-2xl font-bold text-center uppercase text-principal">Lista de Ordenes</h2>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="collapsible table" size="small">
                    <TableHead >
                        <TableRow>
                            <TableCell 
                                sx={{bgcolor: '#ff0000', color: 'white'}}
                            >Fecha</TableCell>
                            <TableCell 
                                sx={{bgcolor: '#ff0000', color: 'white'}}
                            >Dirección</TableCell>
                            <TableCell
                                sx={{bgcolor: '#ff0000', color: 'white'}}
                            >Tipo de entrega</TableCell>
                            <TableCell
                                sx={{bgcolor: '#ff0000', color: 'white'}}
                            >Método de pago</TableCell>
                            <TableCell
                                sx={{bgcolor: '#ff0000', color: 'white'}}
                            >Estado</TableCell>
                            <TableCell
                                sx={{bgcolor: '#ff0000', color: 'white'}}
                            >Cliente</TableCell>
                            <TableCell
                                sx={{bgcolor: '#ff0000', color: 'white'}}
                            >Detalles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <Row key={order.id} order={order} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                    sx={{background: '#ff0000', color: 'white', textAlign: 'center'}}
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={ totalOrders || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={onPageChange} 
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Modal>
    )
}

export default ViewOrderOfDeliveryModal