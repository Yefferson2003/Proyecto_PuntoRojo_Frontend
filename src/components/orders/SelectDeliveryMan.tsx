import { getDeliveryMen } from '@/api/DeliveryManApi'
import { assignDeliveryManOrder } from '@/api/OrderApi'
import { SelectDeliveryManForm } from '@/types/index'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ErrorMessage from '../ErrorMessage'
import Loader from '../Loader'

type SelectDeliveryManProps = {
    orderId: number
}

function SelectDeliveryMan({orderId} : SelectDeliveryManProps) {

    const {data, isLoading} = useQuery({
        queryKey: ['deliveryMenAvailability'],
        queryFn: () => getDeliveryMen({availability: 'true'})
    })

    const { register, handleSubmit, formState: { errors } } = useForm<SelectDeliveryManForm>();
    
    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: assignDeliveryManOrder,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({queryKey: ['order', orderId]})
            toast.success(data)
        },
    })

    const handleAssignDeliveryMan = (formData : SelectDeliveryManForm) => {
        
        const data = {
            orderId,
            deliveryManId : formData.id
        }
        mutate(data)
    }
    
    
    if (isLoading) return <Loader/>
    if (data) return (
        <form 
            className='grid h-12 grid-cols-2 gap-4'
            onSubmit={handleSubmit(handleAssignDeliveryMan)}
        >
        <FormControl sx={{width: 300}}>
            <InputLabel color='error' id="label">Repartidor</InputLabel>
            <Select
                labelId="label"
                id="delivery"
                label="Repartidor"
                color='error'
                {...register('id', {required: 'Repartidor Obligatorio'})}
            >
                {data.map(deliveryMan => (
                    <MenuItem key={deliveryMan.id} value={deliveryMan.id}>
                        <p className='capitalize'>{deliveryMan.user.name}</p>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <Button type='submit' color='error' variant='contained'
            disabled={isPending}
        >
            Asignar repartidor
        </Button>
        {errors.id && 
            <div className='col-span-2'><ErrorMessage>{errors.id.message}</ErrorMessage></div>
        }
        </form>
    )
}

export default SelectDeliveryMan