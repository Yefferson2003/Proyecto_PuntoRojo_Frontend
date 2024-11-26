import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useNavigate } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAuth } from "@/hooks/useAuth";

type AccountSideBarProps = {
    handleDrawerToggle: () => void
}

function AccountSideBar({handleDrawerToggle} : AccountSideBarProps) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const [open, setOpen] = useState(false);
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
    };

    const handleClick = () => {
        setOpen(!open);
    };

    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']});
        toast.warning('Sesión Cerrada')
        handleDrawerToggle()
    };

    const navigate = useNavigate()
    return (
        <div className="w-full">
            {!token ? (
                <ListItemButton onClick={() => navigate('/auth/login')}>
                <ListItemIcon>
                    <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText primary={'Iniciar Sesión'} />
            </ListItemButton>
            ):(
                <div>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cuenta" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {token && userRole === 'user' ? (
                            <div>
                                <ListItemButton sx={{ pl: 4 }}
                                    onClick={() => navigateTo(routes.user.profile)}
                                >
                                    <ListItemText primary="Mi Perfil" />
                                </ListItemButton>
                                
                                <ListItemButton sx={{ pl: 4 }}
                                    onClick={() => navigateTo(routes.user.orders)}
                                >
                                    <ListItemText primary="Mi Pedido" />
                                </ListItemButton>
                            </div>
                            
                        ) :(
                            <ListItemButton sx={{ pl: 4 }}
                                onClick={() =>
                                navigateTo(userRole === 'admin' ? routes.admin : routes.deliveryMan)
                                }
                            >
                                <ListItemText primary="Panel de control" />
                            </ListItemButton>
                        )}
                        
                        
                        <ListItemButton sx={{ pl: 4 }}
                            onClick={logout}
                        >
                            <ListItemText primary="Cerrar Sesión" />
                        </ListItemButton>
                    </List>
                </Collapse>
                </div>
            )}
            
        </div>
    )
}

export default AccountSideBar