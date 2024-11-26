import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Iconos
import Loader from '@/components/Loader';
import LogoBgRed from '@/components/logos/LogoBgRed';
import { useAuth } from '@/hooks/useAuth';
import BarChartIcon from '@mui/icons-material/BarChart';
import ClassIcon from '@mui/icons-material/Class';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountIconAdmin from './AccountIconAdmin';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CampaignIcon from '@mui/icons-material/Campaign';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const drawerWidth = 240;

export default function DashboardAdminView() {

  const navigate = useNavigate()
  const location = useLocation(); // Para obtener la ruta actual
  
  const {data, isError, isLoading} = useAuth()

  if (isLoading) return <div className='flex justify-center w-full mt-20'><Loader/></div>

  if (isError ) {
    navigate('/auth/login')
    return null
  }
  if (data && data.user.rol !== 'admin') {
    navigate('/404')
    return null
  }
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{bgcolor: '#ff0000', display: 'flex', justifyContent: 'space-between'}}>
          <div className='w-[150px]'>
            <LogoBgRed/>
          </div>
          <Typography id='dashboard-admin-tittle' variant="h4" fontWeight={'bold'} noWrap component="div">
            Panel de Control
          </Typography>
          <nav className='flex gap-4'>
            <AccountIconAdmin/>
          </nav>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        
        <Toolbar />
        <Box sx={{ overflow: 'auto', marginTop: '10px'}}>
          <List>
            
            <ListItem disablePadding>
              <ListItemButton 
                  onClick={() => navigate('/dashboard+admin')}
                  sx={{background: isActive('/dashboard+admin') ? '#cbd5e1' : 'white',}}
                >
                <ListItemIcon>
                  <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary={'Estadisticas'} />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton id='button-list-product'
                  onClick={() => navigate('/dashboard+admin/products')}
                  sx={{background: isActive('/dashboard+admin/products') ? '#cbd5e1' : 'white',}}
                >
                <ListItemIcon>
                  <Inventory2Icon/>
                </ListItemIcon>
                <ListItemText primary={'Productos'} />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton id='button-list-categories'
                  onClick={() => navigate('/dashboard+admin/categories')}
                  sx={{background: isActive('/dashboard+admin/categories') ? '#cbd5e1' : 'white',}}
                >
                <ListItemIcon>
                  <ClassIcon/>
                </ListItemIcon>
                <ListItemText primary={'Categorias'} />
              </ListItemButton>
            </ListItem>
          </List>
          
          <Divider sx={{mb: 1}}>Ordenes</Divider>

          <ListItem disablePadding>
            <ListItemButton id='button-list-orders'
                onClick={() => navigate('/dashboard+admin/orders')}
                sx={{background: isActive('/dashboard+admin/orders') ? '#cbd5e1' : 'white',}}
              >
              <ListItemIcon>
                <ReceiptLongIcon/>
              </ListItemIcon>
              <ListItemText primary={'Administración'} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton id='button-list-deliveryMan'
                onClick={() => navigate('/dashboard+admin/deliverys')}
                sx={{background: isActive('/dashboard+admin/deliverys') ? '#cbd5e1' : 'white',}}
              >
              <ListItemIcon>
                <DeliveryDiningIcon/>
              </ListItemIcon>
              <ListItemText primary={'Repartidores'} />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
                onClick={() => navigate('/dashboard+admin/orders+history')}
                sx={{background: isActive('/dashboard+admin/orders+history') ? '#cbd5e1' : 'white',}}
              >
              <ListItemIcon>
                <ViewListIcon/>
              </ListItemIcon>
              <ListItemText primary={'Historial'} />
            </ListItemButton>
          </ListItem>

          <Divider sx={{mb: 1}}>Clientes</Divider>

          <ListItem disablePadding>
            <ListItemButton 
                onClick={() => navigate('/dashboard+admin/customers')}
                sx={{background: isActive('/dashboard+admin/customers') ? '#cbd5e1' : 'white',}}
              >
              <ListItemIcon>
                <AssignmentIndIcon/>
              </ListItemIcon>
              <ListItemText primary={'Clientes'} />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton id='button-list-messages'
                onClick={() => navigate('/dashboard+admin/messages')}
                sx={{background: isActive('/dashboard+admin/messages') ? '#cbd5e1' : 'white',}}
              >
              <ListItemIcon>
                <CampaignIcon/>
              </ListItemIcon>
              <ListItemText primary={'Avisos'} />
            </ListItemButton>
          </ListItem>
        </Box>
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <main className='flex justify-center '>
          <Outlet/>
          <ToastContainer
            pauseOnFocusLoss={false}
            pauseOnHover={false}
          />
        </main>
      </Box>
    </Box>
  );
}
