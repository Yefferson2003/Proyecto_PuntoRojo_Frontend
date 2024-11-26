import { deleteReview } from "@/api/ReviewApi"
import { ReviewForm } from "@/types/index"
import { Button } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"
import { UseFormReset } from "react-hook-form"
import { toast } from "react-toastify"

type ReviewDeleteButtonProps = {
    reset: UseFormReset<ReviewForm>
    setValue: Dispatch<SetStateAction<number>>
    setHover: Dispatch<SetStateAction<number>>
}

function ReviewDeleteButton({reset, setHover, setValue} : ReviewDeleteButtonProps) {

    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: deleteReview,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({queryKey: ['reviewForCustomer']})
            setHover(-1)
            setValue(2)
            reset({
                qualification: 2,
                description: '',
            });
            toast.success(data)
        },
    })

    return (
        <Button fullWidth
            color="error"
            variant="outlined"
            onClick={() => mutate()}
            disabled={isPending}
        >
            Eliminar Reseña
        </Button>
    )
}

export default ReviewDeleteButton