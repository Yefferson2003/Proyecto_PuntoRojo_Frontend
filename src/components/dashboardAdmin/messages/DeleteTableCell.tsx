import { deleteMessage } from "@/api/Messageapi";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TableCell, Tooltip } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type DeleteTableCellProps = {
    messageId: number
}

function DeleteTableCell({messageId} : DeleteTableCellProps) {

    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: deleteMessage,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({queryKey: ['messages']})
            toast.success(data)
        },
    })

    return (
        <TableCell align="center">
        <IconButton
            onClick={() => mutate({messageId})}
            disabled={isPending}
        >
            <Tooltip title='Eliminar Mensaje'>
                <DeleteIcon color={isPending ? 'disabled' : 'action'}/>
            </Tooltip>
        </IconButton>
    </TableCell>
    )
}

export default DeleteTableCell