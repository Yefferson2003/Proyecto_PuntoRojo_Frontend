import { changeAvailabilityDeliveryMan } from "@/api/DeliveryManApi"
import { Button, Chip } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

type ProfileActionsDeliveryManProps = {
    availability: boolean 
}

function ProfileActionsDeliveryMan({availability} : ProfileActionsDeliveryManProps) {

    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: changeAvailabilityDeliveryMan,
        onError(error){
            toast.error(error.message)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({queryKey: ['user']})
            toast.success(data)
        },
    })

    const handleClick = () => {
        mutate(); 
    };
    return (
        <section className="px-5 py-3 space-y-3 text-center bg-white rounded-lg shadow-xl scroll-py-3">
            <div className="space-y-2">
                <h1 className="text-xl font-bold capitalize">
                    Estado
                </h1>
                <Chip 
                    color={
                        availability ?
                        'success' : 'error'
                    }
                    label={
                    availability ? 
                    'Disponible': 'No Disponible'
                } />
            </div>
            <Button fullWidth color="error" variant="contained"
                onClick={handleClick}
                disabled={isPending}
            >
                Cambiar disponibilidad
            </Button>
        </section>
    )
}

export default ProfileActionsDeliveryMan