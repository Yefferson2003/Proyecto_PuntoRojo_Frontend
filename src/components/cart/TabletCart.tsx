import { CartItem } from "@/types/index";
import { formatCurrencyCOP } from "@/utils/index";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRootStore } from "../../stores/rootStore";

type TabletCartProps = {
    cart: CartItem[]
    handleClose: () => void 
    handleNavigate: (path : string) => void
}

function TabletCart({cart, handleClose, handleNavigate} : TabletCartProps) {

    const increaseItem = useRootStore(state  => state.increaseItem)
    const decreaseItem = useRootStore(state  => state.decreaseItem)
    const removeFromCart = useRootStore(state  => state.removeFromCart)
    const clearCart = useRootStore(state  => state.clearCart)
    
    return (
        <section>
            <div className="flex flex-row items-center justify-between m-1">
            <p>Numero de Items:<span className="text-principal"> {cart.length}</span></p>
            <IconButton size="small" color='error'
                onClick={handleClose}
            >
                <HighlightOffIcon/>
            </IconButton>
            </div>
            
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader size="small">
                <TableHead sx={{bgcolor : '#e2e8f0'}}>
                    <TableRow sx={{textTransform: 'uppercase'}}>
                        <TableCell></TableCell>
                        <TableCell><p className="text-principal">Nombre</p></TableCell>
                        <TableCell><p className="text-principal">Cantidad</p></TableCell>
                        <TableCell><p className="text-principal">Precio</p></TableCell>
                        <TableCell><p className="text-principal">Total</p></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map(item => (
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        key={item.product.id}
                        >
                        <TableCell sx={{width: 'full'}} component="th" scope="row">
                            <img className="w-[32px]" src={item.product.imgUrl} alt="" />
                        </TableCell>
                        <TableCell><p className="capitalize w-[200px] text-wrap">{item.product.name}</p></TableCell>
                        <TableCell>
                            <div className="flex items-center">
                                <IconButton size="small"
                                    onClick={() => decreaseItem(item.product.id)}
                                >
                                    <RemoveIcon/>
                                </IconButton>
                                <p>{item.quantity}</p>  
                                <IconButton size="small"
                                    onClick={() => increaseItem(item.product.id)}
                                >
                                    <AddIcon/>
                                </IconButton>
                            </div>
                        </TableCell>
                        <TableCell><p>{formatCurrencyCOP(+item.product.priceAfter)}</p></TableCell>
                        <TableCell><p>{formatCurrencyCOP(item.quantity*+item.product.priceAfter)}</p></TableCell>
                        <TableCell>
                            <IconButton color="error"
                                onClick={() => removeFromCart(item.product.id)}
                            >
                                <ClearIcon/> 
                            </IconButton>
                        </TableCell>
                        </TableRow>
                        
                    ))}
                </TableBody>
            </Table>
            </TableContainer>

            <p className="mx-10 my-2 text-xl text-end">Subtotal: {' '}
                <span className="text-principal"> 
                    {formatCurrencyCOP(cart.reduce((sum, item) => sum + +item.product.priceAfter * item.quantity, 0))}
                </span>
            </p>
            <div className="flex w-full gap-4 p-2">
                <Button fullWidth color="error" variant="outlined"
                    
                    onClick={clearCart}
                >
                    Vaciar Carrito
                </Button>
                
                <Button fullWidth color="error" variant="contained"
                    id="button-view-cart"
                    onClick={ () => {
                        handleNavigate('/cart')
                    }}
                >
                    Ver Carrito
                </Button>
            </div>
        </section>

    )
}

export default TabletCart