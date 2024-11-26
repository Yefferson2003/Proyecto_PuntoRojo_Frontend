import { Badge, ListItemIcon } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componetes
import LogoBgRed from '@/components/logos/LogoBgRed';
import LogoBgWhite from '@/components/logos/LogoBgWhite';

// Router
import { Link, Outlet, useNavigate } from 'react-router-dom';

// Iconos
import { getCategories } from '@/api/CategoryApi';
import Footer from '@/components/about/Footer';
import WhatsAppButton from '@/components/about/WhatsAppButton';
import IconCart from '@/components/cart/IconCart';
import AccountIcon from '@/components/indexLayout/AccountIcon';
import AccountSideBar from '@/components/indexLayout/AccountSideBar';
import MenuCategory from '@/components/menuCategories/MenuCategories';
import SidebarCategories from '@/components/menuCategories/SidebarCategories';
import SearchAppBar from '@/components/SearchAppBar';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useQuery } from '@tanstack/react-query';
import { useRootStore } from "../stores/rootStore";
import MessagesGlobal from '@/components/about/MessagesGlobal';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {

    const navigate = useNavigate();
    const cart = useRootStore(state  => state.cart)
    // const {data, isError, isLoading} = useAuth()

    const {data} = useQuery({
        queryKey: ['categoriesOnVisibilitity'],
        queryFn: () => getCategories({visibility: 'true'}) ,
    })

    // Menú Moviles //
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    
    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <div className='w-[150px] flex mx-auto'>
                <LogoBgWhite/>
            </div>
            <Divider />
            <List onClick={handleDrawerToggle}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Página Principal'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider>Categorias</Divider>
            
            {data && (<SidebarCategories categories={data}/>)}
            
            <Divider/>
            <ListItem disablePadding>
                <AccountSideBar handleDrawerToggle={handleDrawerToggle}/>
            </ListItem>
            <Divider/>
            
            <List onClick={handleDrawerToggle}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/about')}>
                        <ListItemIcon>
                            <ArticleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Sobre Nosotros'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/polices/service')}>
                        <ListItemIcon>
                            <ArticleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Politicas del Servicio'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/polices/privacy')}>
                        <ListItemIcon>
                            <ArticleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Politicas de Privacidad'} />
                    </ListItemButton>
                </ListItem>
                <Divider/>
            </List>
        </Box>
    );
    
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <div>
            
        <CssBaseline /> 
        <AppBar component="nav">
            
            <Toolbar sx={{bgcolor: '#ff0000', height: {xs: '', sm: '100px'}}}>
                
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                
                <Box
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    <Link to={'/'} >
                        <div className='w-[150px]'>
                            <LogoBgRed/>
                        </div>
                    </Link>
                </Box>

            <SearchAppBar />
            
            <div className='hidden sm:block'>
                <IconCart/>
            </div>
            
            <div className='sm:hidden'>
                <IconButton
                    id='icon-cart'
                    onClick={() => navigate('/cart')} size="large" color="inherit"
                >
                    <Badge badgeContent={cart.length} color='info'>
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </div>
            
            <AccountIcon/>
            
            </Toolbar>
            {data && <MenuCategory categories={data}/>}
            
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
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
        </nav>
        
        <main className='mx-auto tablet:mt-10'>
            <Toolbar />
            
            <MessagesGlobal/>
            
            <section className='my-3 '>
                <Outlet/>
            </section>
            
            <Footer/>
        </main>
        <WhatsAppButton/>
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            position='top-center'
        />
        </div>
    );
}
