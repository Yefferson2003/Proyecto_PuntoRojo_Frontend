import { changeStatusOrder, updateOrder } from "@/api/OrderApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

const useChangeOrde = () => {


    const queryClient = useQueryClient()
    
    const {mutate, isPending} = useMutation({
        mutationFn: changeStatusOrder,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['ordersToday']})
        },
    })

    const {mutate: updateOrderMutate, isPending: updateOrderMutateisPendig} = useMutation({
        mutationFn: updateOrder,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['ordersToday']})
        },
    })

    return {mutate, isPending, updateOrderMutate, updateOrderMutateisPendig}
}

export default useChangeOrde