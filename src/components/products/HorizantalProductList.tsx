import { getProduts } from '@/api/ProductApi';
import { formatCurrencyCOP } from '@/utils/index';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Card, CardActions, CardContent, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from "../../stores/rootStore";

type HorizantalProductListProps = {
    subCategoryId: number
}

function HorizantalProductList({ subCategoryId} : HorizantalProductListProps) {
    
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const addToCart = useRootStore(state => state.addToCart)
    
    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const {data} = useQuery({
        queryKey: [ subCategoryId],
        queryFn: () => getProduts({subcategory: subCategoryId}),
    })
    

    const handleProductClick = (productId: number) => {
        const currentPathSegments = location.pathname.split('/');
        currentPathSegments[currentPathSegments.length - 1] = productId.toString();
        
        const newPath = currentPathSegments.join('/');
        navigate(newPath);
    };
    
    if (data) return (
        <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden', my: '20px' }}>
            
            <Button
                onClick={() => handleScroll('left')}
                sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', zIndex: 1 }}
                startIcon={<ArrowBackIosIcon />}
                color='error'
            >
            
            </Button>
    
            <Box
                ref={scrollRef}
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
            {data.products.map((product) => (
                <Card key={product.id} sx={{ minWidth: 275,  mx: 10 }}>
                <div 
                    onClick={() => handleProductClick(product.id)}
                    className="cursor-pointer"
                >
                    <CardContent
                    sx={{
                        ':hover': {
                        opacity: 0.7,
                        transition: 'opacity 0.3s ease',
                        },
                    }}
                    >
                    <div>
                        <img src={product.imgUrl} alt="" className='w-[300px]' />
                    </div>
                    
                    <Divider sx={{ my: '5px' }} />
                    <div className="min-h-[76px] overflow-hidden">
                        <h2 className="line-through text-slate-500">{product.offer && formatCurrencyCOP(+product.priceBefore) }</h2>
                        <h2 className="text-xl text-principal">{formatCurrencyCOP(+product.priceAfter)}</h2>
                        <p>{product.name}</p>
                    </div>
                    </CardContent>
                </div>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        fullWidth
                        sx={{ mx: 'auto' }}
                        color="error"
                        variant="contained"
                        endIcon={<AddShoppingCartIcon />}
                        onClick={() => addToCart(product, 1)}
                    >
                        Añadir al carrito
                    </Button>
                </CardActions>
                </Card>
            ))}
            </Box>
            
            <Button
                onClick={() => handleScroll('right')}
                sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 1 }}
                endIcon={<ArrowForwardIosIcon />}
                color='error'
            >
                
            </Button>
        </Box>
    );
}

export default HorizantalProductList