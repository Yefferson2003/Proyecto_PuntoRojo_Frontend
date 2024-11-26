import { IconButton, TableCell, Tooltip } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changeVisibilityMessage } from "@/api/MessageApi";

type VisibilityTableCellProps = {
    visibility: boolean
    messageId: number
}

function VisibilityTableCell({visibility, messageId} : VisibilityTableCellProps) {

    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: changeVisibilityMessage,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({queryKey: ['messages']})
            toast.success(data)
        },
    })

    return (
        <TableCell align="center" >
            <IconButton
                onClick={() => mutate({messageId})}
                disabled={isPending}
            >
            {visibility ? 
                <Tooltip title='Mensaje Visible'>
                    <VisibilityIcon 
                        color={isPending ? "disabled" : "primary"}/>
                    </Tooltip> : 
                <Tooltip title='Mensaje No Visible'>
                    <VisibilityOffIcon 
                        color={isPending ? "disabled" : "error"}/>
                    </Tooltip>
                }
            </IconButton>
        </TableCell>
    )
}

export default VisibilityTableCell