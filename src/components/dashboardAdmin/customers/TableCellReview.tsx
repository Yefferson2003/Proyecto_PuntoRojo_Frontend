import { Box, Collapse, IconButton, Rating, TableCell, Tooltip, Typography } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CustomerForAdmin } from "@/types/index";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeVisibilityReview } from "@/api/ReviewApi";
import { toast } from "react-toastify";
import { labelsReview } from "@/utils/index";


type TableCellReviewProps = {
    open: boolean
    row: CustomerForAdmin
}

function TableCellReview({open, row} : TableCellReviewProps) {

    const [value] = useState<number>(
        row.review?.qualification ? row.review.qualification : 0
    );
    const { review } = row;
    const isVisible = review?.visibility;

    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: changeVisibilityReview,
        onError(error){
            toast.error(error.message)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({queryKey: ['customers']})
            toast.success(data)
        },
    })
    
    return (
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        {row.review ?
                            (   
                                <div className='flex items-center justify-around gap-10'>
                                    <p>Reseña de <span className='capitalize text-principal'>
                                    {row.user.name} </span> </p>

                                    <IconButton
                                        onClick={() => mutate({ customerId: row.id })}
                                        disabled={isPending}
                                    >
                                        <Tooltip title={isVisible ? "Reseña Visible" : "Reseña No Visible"}>
                                            {isVisible ? (
                                            <VisibilityIcon color="primary" />
                                            ) : (
                                            <VisibilityOffIcon color="error" />
                                            )}
                                        </Tooltip>
                                    </IconButton>
                                </div>
                                
                            ) : ( 
                                'No hay Reseña'
                            )
                        }
                        
                    </Typography>
                    
                    {row.review && 
                        <section className='flex justify-between divide-x-4'>
                            <div className='text-center'>
                                <h2 className='text-xl text-center text-principal'>Calificación</h2>
                                <Rating name="read-only" value={value} readOnly />
                                {value !== null && (
                                    <Box>
                                        <p className="text-lg font-bold uppercase">
                                        {labelsReview[value]}
                                        </p>
                                    </Box>
                                )}
                            </div>
                            
                            <div className='px-3 basis-3/4'>
                                <h2 className='text-xl text-center text-principal'>Opinión</h2>
                                <p className='text-justify'>
                                    {row.review.description ? row.review.description : 'No hay Opinion'}
                                </p>
                            </div>
                        </section>
                    }
                    
                </Box>
            </Collapse>
        </TableCell>
    )
}

export default TableCellReview