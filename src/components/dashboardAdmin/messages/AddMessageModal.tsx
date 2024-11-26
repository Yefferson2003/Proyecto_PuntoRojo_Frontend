

import { createMessage } from '@/api/MessageApi';
import ButtonCloseModal from '@/components/ButtonCloseModal';
import { FormMessage } from '@/types/index';
import { Box, Button, Modal } from "@mui/material";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MessageForm from './MessageForm';

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

function AddMessageModal() {

    // MODAL //
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const modalProduct = queryParams.get('newMessage');
    const show = modalProduct ? true : false;

    //FORM
    const initialValues : FormMessage = {
        message: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: createMessage,
        onError(error){
            toast.error(error.message)
        },
        onSuccess(data){
            queryClient.invalidateQueries({queryKey: ['messages']})
            navigate(location.pathname, {replace: true})
            reset()
            toast.success(data)
        }
    })

    const handleCreateMessage = (formData : FormMessage) => mutate({formData})

    return (
        <Modal
            open={show}
            onClose={() => navigate(location.pathname, {replace: true})}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <ButtonCloseModal/>
            
            <h2 className='text-3xl text-center text-principal'>Nuevo Mensaje</h2>
            <p className='mt-5 text-center'>LLena el siguente formulario para crear un <span className='text-principal'>Mensaje o Anuncio</span></p>
                
            <form
                onSubmit={handleSubmit(handleCreateMessage)}
                className='mt-10 space-y-3 text-center'
                noValidate
                autoComplete="off"
            >
                
                <MessageForm
                    register={register}
                    errors={errors}
                />

                <Button type='submit' variant='contained' color='error'
                    disabled={isPending}
                >
                    Guardar Mensaje
                </Button>
                
            </form>
            </Box>
        </Modal>
    )
}

export default AddMessageModal