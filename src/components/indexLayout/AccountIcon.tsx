import { useAuth } from '@/hooks/useAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function AccountIcon() {
    const navigate = useNavigate();
    const token = localStorage.getItem('AUTH_TOKEN');
    const {data} = useAuth()
    const userRole = data?.user?.rol;

    // Definir rutas
    const routes = {
        user: {
        profile: '/dashboard+customer',
        orders: '/dashboard+customer/orders',
        },
        admin: '/dashboard+admin',
        deliveryMan: '/dashboard+deliveryMan',
    };

    const navigateTo = (path : string) => {
        navigate(path);
        handleClose();
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']});
        setAnchorEl(null)
        toast.warning('Sesión Cerrada')
    };

    return (
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {!token ? (
                <IconButton
                    id='button-login'
                    aria-label='button-login'
                    onClick={() => navigate('/auth/login')} size="large" color="inherit">
                    <Tooltip title='Iniciar Sesión'>
                        <AccountCircleIcon />
                    </Tooltip>
                </IconButton>
            ) : (
                <div>
                    <IconButton id='button-profile'
                        aria-label='button-profile'
                        size="large" color="inherit" onClick={handleClick}
                    >
                        <AccountCircleIcon />
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
                        {token && userRole === 'user' ? (
                        <div>
                            <MenuItem id="menu-profile" 
                            onClick={() => navigateTo(routes.user.profile)}>
                            Perfil
                            </MenuItem>
                            <MenuItem 
                            onClick={() => navigateTo(routes.user.orders)}>
                            Mi Pedido
                            </MenuItem>
                        </div>
                        ) : (
                            <MenuItem
                                id="menu-profile"
                                onClick={() =>
                                navigateTo(userRole === 'admin' ? routes.admin : routes.deliveryMan)
                                }
                            >
                                Panel de control
                            </MenuItem>
                        )}
                        <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
                    </Menu>
                </div>
            )}
        </Box>
    );
}

export default AccountIcon;
