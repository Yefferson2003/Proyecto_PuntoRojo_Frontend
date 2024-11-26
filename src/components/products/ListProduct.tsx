import { Product } from "@/types/index";
import { formatCurrencyCOP } from "@/utils/index";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, CardActions } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRootStore } from "../../stores/rootStore";


type ListProductProps = {
    products: Product[]
}

export default function ListProducts({products} : ListProductProps) {

    const navigate = useNavigate()
    const location = useLocation();

    const isRootPath = location.pathname === '/';
    
    const addToCart = useRootStore(state => state.addToCart)

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 justify-items-center">
        {products.map(product => (
            <section className="relative bg-white shadow-xl group min-w-[200px]" key={product.id}>
            <div className="p-2">
                <div 
                    id={`button-view-product-${product.id}`}
                    onClick={ isRootPath ? (
                        () => navigate(`products/${product.id}`)
                    ) : (
                        () =>navigate(location.pathname + `/products/${product.id}`)
                    )}
                    className="cursor-pointer max-w-[200px] lg:max-w-[350px]"
                >   
                    <div 
                    className="w-full overflow-hidden rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80"
                    >
                        <img
                            alt={product.name}
                            src={product.imgUrl}
                            className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                            loading="lazy"
                        />
                    </div>

                    <div className="flex justify-between my-4">
                        <div>
                            <h3 className="text-sm text-gray-700 capitalizex">
                                
                                <span aria-hidden="true" className="absolute inset-0 "/>
                                {product.name}
                                
                            </h3>
                        </div>
                        
                        <div className="flex flex-col">
                            {product.offer && 
                                <p className="text-sm font-medium text-gray-500 line-through">
                                    {formatCurrencyCOP(+product.priceBefore)}
                                </p>
                            }
                            <p className="text-sm font-medium text-principal">{formatCurrencyCOP(+product.priceAfter)}</p>
                        </div>
                    </div>
                    
                </div>
                <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button fullWidth sx={{mx: 'auto'}} color="error" variant="contained"
                        size="small"
                        endIcon={<AddShoppingCartIcon/>}
                        onClick={() => {
                            addToCart(product, 1)
                            toast.success('Producto añadido correctamente' ,
                                {position: "top-center",}
                            )
                        }}
                    >Anadir al carrito
                    </Button>
                </CardActions>
            </div>
            </section>
        ))}
        </div>
    )
}
