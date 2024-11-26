import { changeAvailabilityProduct, changeOfferProduct } from '@/api/ProductApi';
import { Product } from '@/types/index';
import { formatCurrencyCOP } from '@/utils/index';
import EditIcon from '@mui/icons-material/Edit';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, TablePagination, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type ProductListProps = {
    products: Product[]
    onPageChange: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
    totalProducts: number
    page: number
    rowsPerPage: number
    search: string
}

export default function ProductList({products, onPageChange, handleChangeRowsPerPage, totalProducts,  page, rowsPerPage, search }:ProductListProps) {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const emptyRows = useMemo(
        () => page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (products?.length || 0)) : 0,
        [page, rowsPerPage, products]
    );
    
    const visibleRows = useMemo(
        () => products?.length > 0 ? products : [],
        [products],
    );
    
    
    const {mutate: changeAvailability} = useMutation({
        mutationFn: changeAvailabilityProduct,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data, {productId}) {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['searchProductsAdmin', search, page, rowsPerPage]})
            queryClient.invalidateQueries({queryKey: ['product', productId]})
        },
    })
    
    const {mutate: changeOffer} = useMutation({
        mutationFn: changeOfferProduct,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data, {productId}) {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['searchProductsAdmin', search, page, rowsPerPage]})
            queryClient.invalidateQueries({queryKey: ['product', productId]})
        },
    })
    
    return (
        <div>
        <TableContainer component={Paper}>
            <Table size='small' sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead sx={{bgcolor: '#ff0000'}}>
                <TableRow>
                    <TableCell sx={{color: 'white'}}>Imagen</TableCell>
                    <TableCell sx={{color: 'white'}}>Código de Barra</TableCell>
                    <TableCell sx={{color: 'white'}}>Nombre</TableCell>
                    <TableCell sx={{color: 'white'}}>Precio</TableCell>
                    <TableCell sx={{color: 'white'}} align='center'>Disponibilidad</TableCell>
                    <TableCell sx={{color: 'white'}} align='center'>Oferta</TableCell>
                    <TableCell sx={{color: 'white'}}>Ver / Editar</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {visibleRows.map(product => (
                    <TableRow
                    key={product.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        <img className='w-[64px]' src={product.imgUrl} alt={product.name} />
                    </TableCell>
                    <TableCell >{product.nit}</TableCell>
                    <TableCell width={'200'} ><p className='uppercase text-wrap'>{product.name}</p></TableCell>
                    <TableCell >{formatCurrencyCOP(+product.priceAfter)}</TableCell>
                    <TableCell align='center' >
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => changeAvailability({productId: product.id})}
                        >
                            {product.availability ? 
                                <Tooltip title='Esta Visible'><VisibilityIcon color='info'/></Tooltip> : 
                                <Tooltip title='No Esta Visible'><VisibilityOffIcon color='error'/></Tooltip>
                            }
                        </IconButton>
                    </TableCell>
                    <TableCell align='center' >
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => changeOffer({productId: product.id})}
                        >
                            {product.offer ? 
                                <Tooltip title='Esta en Oferta'><LocalOfferIcon color='info'/></Tooltip> : 
                                <Tooltip title='No Esta en Oferta'><LocalOfferIcon color='error'/></Tooltip>
                            }
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => navigate(location.pathname + `?editProduct=${product.id}`)}
                        >
                            <EditIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                ))}
                {emptyRows > 0 && (
                    <TableRow
                    >
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            sx={{background: '#ff0000', color: 'white', textAlign: 'center'}}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={ totalProducts || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange} // Cambio de Página
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div>
    );
}
