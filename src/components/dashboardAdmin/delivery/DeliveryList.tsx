import { useDelivery } from "@/hooks/useDelivery";
import { deliveryManStatusTraslatios } from "@/locales/es.";
import { DeliveryMan } from "@/types/index";
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { Chip, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

type DeliveryListProps = {
    deliveryMen: DeliveryMan[]
}

function DeliveryList({deliveryMen} : DeliveryListProps) {

    const navigate = useNavigate()
    const {changeStatus} = useDelivery()

    const handleChangeStatus =  (id : DeliveryMan['id']) => {
        changeStatus({ deliveryManId: id });
    } 

    return (
        <TableContainer component={Paper}>
            <Table size='small' sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead sx={{bgcolor: '#ff0000'}}>
                <TableRow >
                    <TableCell sx={{color: 'white'}}>Nombre</TableCell>
                    <TableCell sx={{color: 'white'}}>Identificación</TableCell>
                    <TableCell sx={{color: 'white'}}>Télefono</TableCell>
                    <TableCell align="center"  sx={{color: 'white'}}>Disponibilidad</TableCell>
                    <TableCell align="center"  sx={{color: 'white'}}>Estado</TableCell>
                    <TableCell align="center" sx={{color: 'white'}}>Pedidos</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {deliveryMen.map(deliveryMan => (
                    <TableRow
                    key={deliveryMan.id}
                    sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            textTransform: 'capitalize'
                        }}
                    >
                    <TableCell component="th" scope="row">
                        {deliveryMan.user.name}
                    </TableCell>

                    <TableCell >
                        {deliveryMan.identification}
                    </TableCell>

                    <TableCell >
                        {deliveryMan.phone}
                    </TableCell>

                    <TableCell align="center" >
                        {deliveryMan.availability ? 
                        <Tooltip title='Repartidor Disponible'><PersonIcon color="primary"/></Tooltip> : 
                        <Tooltip title='Rerpatidor No Disponible'><PersonOffIcon color="error"/></Tooltip>
                        }
                    </TableCell>

                    <TableCell align="center" >
                        <Stack spacing={1}>
                            <Chip
                            onClick={() => handleChangeStatus(deliveryMan.id)}
                            component="button"
                            size="small"
                            label={deliveryManStatusTraslatios[deliveryMan.status]}
                            color={deliveryMan.status === 'active' ? 'success' : 'error'}
                        />
                        </Stack>
                    
                    </TableCell>

                    <TableCell align='center' >
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => navigate(location.pathname +`?viewDelivery=${deliveryMan.id}`)}
                        >
                            <AssignmentIcon color="primary"/>
                        </IconButton>
                    </TableCell>
                    
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DeliveryList