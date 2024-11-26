import { DeliveryMan, DeliveryManUpdateForm } from "@/types/index";
import { Box, Button, FormControl, Modal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonCloseModal from "../ButtonCloseModal";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDeliveryMan } from "@/api/DeliveryManApi";
import { toast } from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    maxWidth: 700,
    bgcolor: '#f1f5f9',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '95vh',  // Altura máxima en porcentaje de la pantalla
    overflowY: 'auto',
};

type EditDeliveryManModalProps = {
    deliveryMan: DeliveryMan
}

function EditDeliveryManModal({deliveryMan} : EditDeliveryManModalProps) {

    // MODAL //
    const navigate = useNavigate();
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const modalDeliveryMan = queryParams.get('editDeliveryMan');
    const show = modalDeliveryMan ? true : false;

    // FORM
    const initialValues: DeliveryManUpdateForm = {
        name: deliveryMan.user.name,
        identification: deliveryMan.identification || '',
        phone: deliveryMan.phone || '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: updateDeliveryMan,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({queryKey: ['user']})
            navigate(location.pathname, {replace: true})
            toast.success(data)
        },
    })

    const handleUpdateDelivery = (formData : DeliveryManUpdateForm) => mutate(formData)

    return (
        <Modal
            open={show}
            onClose={() => navigate(location.pathname, {replace: true})}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
        >
        <Box sx={style}>
        <div className="w-full text-end ">
            <ButtonCloseModal/>

            <h2 className='text-3xl text-center text-principal'>Editar Cuenta</h2>
            <p className='mt-5 text-center'>LLena el siguente formulario para editar tu <span className='text-principal'>Cuenta</span></p>

            <form
                onSubmit={handleSubmit(handleUpdateDelivery)}
                className='mt-10 space-y-4 text-center'
                noValidate
                autoComplete="off"
            >

                <FormControl fullWidth>
                    <TextField id="name" label="Nombre" color="error" size="small"
                        {...register('name', {
                        required: "El nombre es obligatorio"
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </FormControl>

                    
                <FormControl fullWidth>
                    <TextField id="identification"  color="error" size="small"
                        label='Identificacion'
                        {...register('identification', {
                        required: "El número de identificación es obligatorio"
                        })}
                    />
                    {errors.identification && (
                        <ErrorMessage>{errors.identification.message}</ErrorMessage>
                    )}
                </FormControl>

                <FormControl fullWidth>
                    <TextField id="phone" label="Télefono" color="error" size="small"
                        {...register('phone', {
                        required: "El Teléfono es obligatorio",
                        pattern: {
                            value: /^[3][0-9]{9}$/,
                            message: "Número de teléfono inválido, debe ser un número colombiano de 10 dígitos",
                        },
                        minLength: {
                            value: 10,
                            message: "El número debe tener 10 dígitos",
                        },
                        maxLength: {
                            value: 10,
                            message: "El número debe tener 10 dígitos",
                        },
                        })}
                    />
                    {errors.phone && (
                        <ErrorMessage>{errors.phone.message}</ErrorMessage>
                    )}
                </FormControl>
                
                <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    disabled={isPending}
                >
                    Actualizar Datos
                </Button>
            </form>
        </div>

        </Box>
        </Modal>
    )
}

export default EditDeliveryManModal