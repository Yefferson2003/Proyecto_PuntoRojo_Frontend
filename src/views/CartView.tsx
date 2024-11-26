import { Button, Divider, IconButton } from "@mui/material"
import { useRootStore } from "../stores/rootStore";
import { formatCurrencyCOP } from "../utils";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";

function CartView() {
    const navigate = useNavigate()
    

    const cart = useRootStore((state => state.cart))
    const increaseItem = useRootStore(state  => state.increaseItem)
    const decreaseItem = useRootStore(state  => state.decreaseItem)
    const removeFromCart = useRootStore(state  => state.removeFromCart)
    const clearCart = useRootStore(state  => state.clearCart)


    const subtotal = (cart.reduce((sum, item) => sum + +item.product.priceAfter * item.quantity, 0))
    // const domicilio = ( cart.reduce((sum, item) => sum + +item.product.priceAfter * item.quantity, 0) >= 50000 ? 0 : 3000)
    
    return (
        <section className="grid w-full grid-cols-1 gap-4 px-5 mx-auto text-principal md:grid-cols-2">

        <h1 className="mb-1 text-2xl font-bold text-center capitalize md:col-span-2 lg:text-4xl md:text-start">
            Carrito de Compra
        </h1>
        
        <div>
        <Divider sx={{background: '#ff0000'}}/>

        {cart.length > 0 ? (
            <p></p>
        ) : (
            <div className="my-10 space-y-4 text-center">
                <p className="font-bold text-black capitalize ">No hay Productos en tu carrito</p>
                <Button variant="contained" color="error"
                    onClick={() => navigate('/')}
                >
                    Continuar Comprando
                </Button>
            </div>

        )}
        
        <section className="flex flex-col my-5 space-y-4 text-black">
        {cart && cart.map((item => (
            
            <div 
                key={item.product.id}
                className="flex flex-row gap-2 p-2 bg-white shadow-lg lg:justify-around"
            >
                <div className="lg:min-w-[200px] min-w-[100px] md:min-w-[150px] lg:max-w-[200px] max-w-[100px] md:max-w-[150px]">
                    <img className="w-full" src={item.product.imgUrl} alt={item.product.name} />  
                </div>

                <div className="flex flex-col gap-1 lg:flex-row">
                <div className="lg:w-[200px] w-[175px] md:w-[130px]">
                    <h2 className="font-bold capitalize text-wrap">{item.product.name}</h2>
                    <p className="text-gray-500 line-through">{item.product.offer && formatCurrencyCOP(+item.product.priceBefore)}</p>
                    <p className="text-principal">{formatCurrencyCOP(+item.product.priceAfter)}</p>
                    <p className="mt-5">Total: 
                        <span className="font-bold"> {formatCurrencyCOP(+item.product.priceAfter * item.quantity)}</span>
                    </p>
                </div>

                <Divider sx={{bgcolor: '#ff0000'}}/>

                <div className="flex justify-center lg:items-start">
                    <div className="flex items-center">
                    <IconButton onClick={() => decreaseItem(item.product.id)}>
                        <RemoveIcon/>
                    </IconButton>
                    <p className="text-principal">{item.quantity}</p>
                    <IconButton onClick={() => increaseItem(item.product.id)}>
                        <AddIcon/>
                    </IconButton>
                    </div>
                </div>
                </div>


                <div className="">
                    <div>
                    <IconButton 
                        onClick={() => removeFromCart(item.product.id)}
                    >
                        <ClearIcon/>
                    </IconButton>
                    </div>
                </div>
            </div>
            
        )))}
        </section>
        </div>

        <div className="">
            <h2 className="mb-2 font-bold text-center capitalize md:text-xl">
                Resumen del Pedido
            </h2>

            <div className="p-2 mx-auto space-y-4 font-bold text-black capitalize bg-white divide-y-4 rounded-lg shadow-sm lg:w-3/4">
                <div className="flex justify-between">
                    <h2>Numero de Productos:</h2>
                    <p>{cart.length}</p>
                </div>
                
                <div className="flex justify-between">
                    <h2>valor sin Descuento:</h2>
                    <p>{formatCurrencyCOP(cart.reduce((sum, item) => 
                        item.product.offer ? sum + +item.product.priceBefore : sum + +item.product.priceAfter * item.quantity, 0))}</p>
                </div>
                
                <div className="flex justify-between">
                    <h2 className="text-wrap">Numero de Productos
                        con descuentos:</h2>
                    <p className="">{cart.filter( item => item.product.offer).length}</p>
                </div>
                

                <div className="flex justify-between">
                    <h2>Valor descontado: </h2>
                    <p>
                    {formatCurrencyCOP(cart.reduce((sum, item) => 
                        item.product.offer 
                            ? sum + (+item.product.priceBefore - +item.product.priceAfter) 
                            : sum, 0))}
                    </p>
                </div>
                
                <div className="flex justify-between text-xl text-principal">
                    <h2>Subtotal:</h2>
                    <p>
                    {formatCurrencyCOP( +subtotal)}
                    </p>
                </div>
            </div>

            <div className="flex w-full gap-2 mx-auto mt-5 lg:w-3/4">
                <Button fullWidth color="error" variant="outlined"
                    onClick={clearCart}
                >
                    Vaciar Carrito
                </Button>
                <Button fullWidth color="error" variant="contained"
                    id="button-proccess-pay"
                    disabled={!cart.length}
                    onClick={() => navigate('/checkouts')}
                >
                    Proceso de Pedido
                </Button>
            </div>
        </div>
            
        </section>
    )
}

export default CartView

