import { getOrders } from '@/api/OrderApi';
import Loader from '@/components/Loader';
import OrderCompleted from '@/components/orders/OrderCompleted';
import OrderData from '@/components/orders/OrderData';
import OrderDelivery from '@/components/orders/OrderDelivery';
import OrderListTable from '@/components/orders/OrderListTable';
import OrderPickup from '@/components/orders/OrderPickup';
import OrderReturn from '@/components/orders/OrderReturn';
import socket from '@/socket/index';
import { OrderList } from '@/types/index';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function OrderView() {
    const [value, setValue] = useState(0);
    const queryClient = useQueryClient()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    
    const {data, isLoading} = useQuery({
        queryKey: ['ordersToday'],
        queryFn: () => getOrders({orderToday: true})
    })

    useEffect(() => {
        socket.on('newOrder', () => {
            queryClient.invalidateQueries({ queryKey: ['ordersToday'] });
        });
        socket.on('changeOrderAdmin', () => {
            queryClient.invalidateQueries({ queryKey: ['ordersToday'] });
        });
    
        return () => {
            socket.off('newOrder');
            socket.off('changeOrderAdmin');
        };
    }, [queryClient]);
    
    
    let orders : OrderList[] = []
    
    if (data) {
        orders = data.orders
    }

    const ordersInReviewFilter = orders?.filter(order => 
        order.status === 'inReview'
    )
    const ordersPickupFilter = orders?.filter(order => 
        order.status !== 'inReview' && order.deliveryType === 'pickup' && order.status !== 'sending'
        && order.status !== 'completed' && order.status !== 'return' && order.status !== 'cancel'
    )
    const ordersDeliveryFilter = orders?.filter(order => 
        order.status !== 'inReview' && order.deliveryType === 'delivery' && order.status !== 'ready'
        && order.status !== 'completed' && order.status !== 'return' && order.status !== 'cancel'
    )
    const ordersCompletedFilter = orders?.filter(order => 
        order.status == 'completed'
    )
    const ordersReturnFilter = orders?.filter(order => 
        order.status == 'return'
    )

    if (isLoading) return <Loader/>
    if (orders) return (
        <section className='w-full'>
        <Box>
            <h1 className="text-4xl font-bold text-center uppercase text-principal">Ordenes</h1>
            <p className="mt-3 text-lg">Aquí podras visualizar y administrar los <span className="font-bold text-principal">pedidos</span></p>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <Tabs 
                
                value={value} 
                onChange={handleChange}
                sx={{ '& .MuiTabs-indicator': { backgroundColor: 'red' }, color: '#ff0000' }} 
            >
                
                <Tab label="Pendientes" {...a11yProps(0)}/>
                <Tab label="Punto de Recogida" {...a11yProps(1)}/>
                <Tab label="Domicilio" {...a11yProps(2)}/>
                <Tab label="Completadas" {...a11yProps(3)}/>
                <Tab label="Devolución" {...a11yProps(4)}/>
            </Tabs>
        </Box>
        
        <CustomTabPanel value={value} index={0}>
            <section className="space-y-3">
            
            <p>Aquí podras ver los pedidos, <span className="capitalize text-principal">aceptarlos</span> o <span className="capitalize text-principal">rechazarlos</span>, e iniciar el proceso de <span className="capitalize text-principal">despacho</span></p>
            
            <OrderListTable rows={ordersInReviewFilter}/> 
            </section>
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={1}>
            <OrderPickup orders={ordersPickupFilter}/>
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={2}>
            <OrderDelivery orders={ordersDeliveryFilter}/>
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={3}>
            <OrderCompleted orders={ordersCompletedFilter}/>
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={4}>
            <OrderReturn orders={ordersReturnFilter}/>
        </CustomTabPanel>

        </Box>
        <OrderData/>
        </section>
    );
}