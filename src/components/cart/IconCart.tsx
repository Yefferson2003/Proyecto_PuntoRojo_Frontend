import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Box, IconButton, Menu } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useRootStore } from "../../stores/rootStore";
import TabletCart from "./TabletCart";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

function IconCart() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const cart = useRootStore(state  => state.cart)
    
    return (
        <Box sx={{  }}>
            <IconButton size="large" color="inherit"
                id='button-icon-cart'
                onClick={handleClick}
            >
                <Badge badgeContent={cart.length} color="info">
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >   
                <div className="flex items-center p-2">
                    {!cart.length ? (
                        <div className='w-full space-y-4 text-center'>
                        <p className="font-bold text-center text-principal">No hay productos en tu carrito</p>
                        <RemoveShoppingCartIcon color='warning'/>                   
                        </div>
                    ) : (
                        <TabletCart cart={cart} handleClose={handleClose}/>
                    )}
                </div>
                
            </Menu>
        </Box>
    )
}

export default IconCart