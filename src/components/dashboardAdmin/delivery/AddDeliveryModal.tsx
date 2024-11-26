import { createAccountDeliveryMan } from "@/api/DeliveryManApi";
import ButtonCloseModal from "@/components/ButtonCloseModal";
import { DeliveryManRegistrationForm } from "@/types/index";
import { Box, Button, Modal } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeliveryForm from "./DeliveryForm";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: '#f1f5f9',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '95vh',  // Altura máxima en porcentaje de la pantalla
    overflowY: 'auto',
};

function AddDeliveryModal() {
    // MODAL //
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const modalProduct = queryParams.get('newDelivery');
    const show = modalProduct ? true : false;

    //FORM
    const initialValues : DeliveryManRegistrationForm = {
        email: '',
        password: 'repartidorpuntorojo',
        password_confirmation: 'repartidorpuntorojo',
        name: '',
        phone: '',
        identification: ''
    }

    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({defaultValues: initialValues})
    

    //MUTATE
    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: createAccountDeliveryMan,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['deliveries']})
            reset()
            navigate(location.pathname, {replace: true})
        },
    })

    const handleCreateDeliveryMan = (formData : DeliveryManRegistrationForm) => mutate({formData})
    
    return (
        <Modal
            open={show}
            onClose={() => navigate(location.pathname, {replace: true})}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
        >
            <Box sx={style}>
            <ButtonCloseModal/>
            <h2 className='text-3xl text-center text-principal'>Nuevo Repartido</h2>
            <p className='mt-5 text-center'>LLena el siguente formulario para crear un <span className='text-principal'>Repartidor</span></p>
            
            <form
                onSubmit={handleSubmit(handleCreateDeliveryMan)}
                className='mt-10 space-y-3 text-center'
                noValidate
                autoComplete="off"
            >
                
                
                <DeliveryForm
                    register={register}
                    errors={errors}
                    watch={watch}
                />

                <Button type='submit' variant='contained' color='error' disabled={isPending}>
                    Guardar Repartidor
                </Button>

            </form>
            </Box>
        </Modal>
    )
}

export default AddDeliveryModal