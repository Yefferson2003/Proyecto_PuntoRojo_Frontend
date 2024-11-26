
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DeleteTableCell from "./DeleteTableCell";
import VisibilityTableCell from "./VisibilityTableCell";
import { useNavigate } from "react-router-dom";
import { getMessages } from '@/api/MessageApi';


function MessagesList() {

    const navigate = useNavigate()

    const {data} = useQuery({
        queryKey: ['messages'],
        queryFn: getMessages
    })

    if (data) return (
        <section className="mt-10">
            {!data.length ? (
                <p className="font-bold text-center text-principal">No hay Mensajes aun</p>
            ) : ( 
                <TableContainer component={Paper}>
                    <Table size='small' sx={{ minWidth: 850 }} aria-label="simple table">
                    <TableHead sx={{bgcolor: '#ff0000'}}>
                        <TableRow >
                            <TableCell sx={{color: 'white'}}>Mensaje</TableCell>
                            <TableCell align="center"  sx={{color: 'white'}}>Visibilidad</TableCell>
                            <TableCell align="center"  sx={{color: 'white'}}>Editar</TableCell>
                            <TableCell align="center"  sx={{color: 'white'}}>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {data.map(message => (
                            <TableRow
                            key={message.id}
                            sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    textTransform: 'capitalize'
                                }}
                        >
                            <TableCell component="th" scope="row">
                                {message.message}
                            </TableCell>
                            
                            <VisibilityTableCell 
                                visibility={message.visibility} 
                                messageId={message.id}
                            />

                            <TableCell align="center">
                                <IconButton
                                    onClick={() => navigate(location.pathname + `?editMessage=${message.id}`)}
                                >
                                    <Tooltip title='Editar Mensaje'>
                                        <EditIcon/>
                                    </Tooltip>
                                </IconButton>
                            </TableCell>

                            <DeleteTableCell
                                messageId={message.id}
                            />
                            
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                
            )}
        </section>
    )
}

export default MessagesList