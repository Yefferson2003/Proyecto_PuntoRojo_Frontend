import Loader from '@/components/Loader';
import LogoBgRed from '@/components/logos/LogoBgRed';
import LogoBgWhite from '@/components/logos/LogoBgWhite';
import { useAuth } from '@/hooks/useAuth';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

interface Props {
    /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
    window?: () => Window;
}

const drawerWidth = 240;

const navItems = ['perfil', 'orders', 'logout'];
const navItemsTraslations : {[key: string] : string} = {
    perfil : 'Perfil', 
    orders : 'Pedidos por Entregar',
    logout : 'Cerrar Sesión'
}
const navItemsUrls : {[key: string] : string} = {
    perfil : '/dashboard+deliveryMan', 
    orders : '/dashboard+deliveryMan/orders',
    logout : '/'
}


export default function DeliveryManLayout (props: Props) {

    const {data, isError, isLoading} = useAuth()
    const navigate = useNavigate()
    
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const queryClient = useQueryClient()
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']});
        toast.warning('Sesión Cerrada')
    };

    const handleNavigation = (item : string) => {
        navigate(navItemsUrls[item]);
        if (item === 'logout') {
            logout();
            navigate('/')
        }
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>

        <div className='w-[150px] mx-auto'>
            <LogoBgWhite/>
        </div>

        <Divider />
        <List>
            {navItems.map((item) => (
            <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} 
                    onClick={() => handleNavigation(item)}
                >
                    <ListItemText primary={navItemsTraslations[item]} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    if (isLoading) return <div className='flex justify-center w-full mt-20'><Loader/></div>

    if (isError ) {
        navigate('/auth/login')
        return null
    }

    if (data && data.user.rol !== 'deliveryman') {
        navigate('/404')
        return null
    }

    return (
        <Box sx={{ display: 'flex', width: '100%'}}>
        <CssBaseline />
        <AppBar component="nav" sx={{bgcolor: '#ff0000'}}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            
            <Typography
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
            >   
                <div className='w-[150px] my-1'>
                <Link to={'/'} >
                    <LogoBgRed/>
                </Link>
                </div>
            </Typography>
            
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff' }}
                    onClick={() => handleNavigation(item)}
                >
                    {navItemsTraslations[item]}
                </Button>
                ))}
            </Box>
            
            </Toolbar>
        </AppBar>
        <nav>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
            {drawer}
            </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3, width: '100%'}}>
            <Toolbar />
            <section className='w-full mb-5'>
                {data &&
                    <Outlet context={data}/>
                }
            </section>
        </Box>
        <ToastContainer/>
        </Box>
    );
}
