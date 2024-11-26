import { deliveryTypeTraslatios, paymentMethodTraslatios, statusTraslations } from "@/locales/es.";
import { OrderList } from "@/types/index";
import { formatDateTime } from "@/utils/index";
import PreviewIcon from '@mui/icons-material/Preview';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

type OrderListTable = {
    rows: OrderList[]
    onPageChange?: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage?: (event: React.ChangeEvent<HTMLInputElement>) => void
    totalOrders?: number
    page?: number
    rowsPerPage?: number
    search?: string | undefined
}

function OrderListTable({rows, onPageChange, handleChangeRowsPerPage, totalOrders, page, rowsPerPage} : OrderListTable) {

    const navigate = useNavigate()

    return (
        <div>
        <TableContainer component={Paper}>
            <Table size="small" >
            <TableHead sx={{bgcolor: '#ff0000'}}>
                <TableRow sx={{ '& th': { color: 'white' } }}>
                    <TableCell align="center" sx={{width: '100px'}}>Fecha</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Dirección</TableCell>
                    <TableCell>Tipo de entrega</TableCell>
                    <TableCell>Método de pago</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell align="center">Ver Productos</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center" sx={{width: 'full'}}>
                            {formatDateTime(row.createdAt)}
                        </TableCell>
                        <TableCell>
                            <p className="capitalize">
                                {row.customer.user.name}
                            </p>
                        </TableCell>
                        <TableCell>{row.deliveryType == 'delivery' ? row.address : '---'}</TableCell>
                        <TableCell>
                            {Object.entries(deliveryTypeTraslatios)
                            .find(([key]) => key === row.deliveryType)?.[1]}
                        </TableCell>
                        <TableCell>
                            {
                                Object.entries(paymentMethodTraslatios)
                                .find(([key]) => key == row.paymentMethod)?.[1]
                            }
                        </TableCell>
                        <TableCell>
                            {
                                Object.entries(statusTraslations)
                                .find(([key]) => key == row.status)?.[1]
                            }
                        </TableCell>
                        <TableCell align="center">
                            <Tooltip title='Ver Lista de Productos' placement="left">
                            <IconButton
                                id={`button-view-order-${row.id}`}
                                onClick={() => navigate(location.pathname + `?viewOrder=${row.id}`)
                            }>
                                <PreviewIcon color="primary"/>
                            </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        
        {(
            onPageChange && 
            handleChangeRowsPerPage && 
            page !== undefined && 
            rowsPerPage !== undefined && 
            totalOrders !== undefined) && (
                <TablePagination
                    sx={{background: '#ff0000', color: 'white', textAlign: 'center'}}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={ totalOrders || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={onPageChange} 
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
        )}
        
        </div>
    )
}

export default OrderListTable