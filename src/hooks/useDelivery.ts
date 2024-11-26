import { changeStatusDeliveryMan, getDeliveryMen } from "@/api/DeliveryManApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useDelivery = () => {

    const queryClient = useQueryClient()

    const {data: deliveryMen, isLoading} = useQuery({
        queryKey: ['deliveries'],
        queryFn: getDeliveryMen
    })

    const {mutate: changeStatus, isPending} = useMutation({
        mutationFn: changeStatusDeliveryMan,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({queryKey: ['deliveries']})
            toast.success(data)
        },
    })

    return {
        deliveryMen,
        isLoading,
        changeStatus,
        isPending
    }
} 