import { createCategory } from '@/api/CategoryApi';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from './CategoryForm';
import { Category, CategoryFormData } from '@/types/index';
import ButtonCloseModal from '@/components/ButtonCloseModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type AddCategoryModalProps = {
    categories: Category[]
}

export default function AddCategoryModal({categories}:AddCategoryModalProps) {

    // MODAL //
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const modalCategory = queryParams.get('newCategory');
    const show = modalCategory ? true : false;


    const initialValues : CategoryFormData = {
        name: '',
        visibility: true
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm(
        { defaultValues: initialValues});
    
    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: createCategory,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['categories']})
            navigate(location.pathname, {replace: true})
            reset()
        },
    })

    const handleCreateCategory = (formData : CategoryFormData) => { 
        const isDuplicate = categories.some(category => category.name === formData.name);

        if (isDuplicate) {
            toast.error('Nombre de Categoría ya utilizado');
            return;  // Detenemos la ejecución aquí si se encuentra un duplicado
        }

        // Si no hay duplicado, ejecutamos mutate
        mutate({ formData });
    }
    return (
    <div>
        <Modal
            open={show}
            onClose={() => navigate(location.pathname, {replace: true})}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <ButtonCloseModal/>
            <h2 className='text-3xl text-center text-principal'>Nueva Categoria</h2>
            <p className='mt-5 text-center'>LLena el siguente formulario para crear una <span className='text-principal'>Categoria</span></p>
            
            <form
                className='mt-10 space-y-3 text-center'
                noValidate
                onSubmit={handleSubmit(handleCreateCategory)}
            >
                
                <CategoryForm 
                    register={register} 
                    errors={errors} 
                    visibilityDefault={initialValues.visibility}/>

            <Button type='submit' variant='contained' color='error'
                disabled={isPending}
            >
                Guardar Categoria
            </Button>

            </form>
            </Box>
        </Modal>
    </div>
);
}
