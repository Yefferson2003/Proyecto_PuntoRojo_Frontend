import { createSubCategory } from '@/api/SubCategoryApi';
import { SubCategoryFormData } from '@/types/index';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SubCategoryForm from './SubCategoryForm';
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

export default function AddSubCategoryModal() {

    // MODAL //
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const modalSubCategory = queryParams.get('newSubCategory');
    const show = modalSubCategory ? true : false;

    // OBTENER CATEGORY_ID
    const categoryId = Number(queryParams.get('categoryId'))!

    const initialValues: SubCategoryFormData = {
        name: "",
        visibility: true
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm(
        { defaultValues: initialValues});
    
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createSubCategory,
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

    const handleCreateCategory = (dataForm : SubCategoryFormData) => {
        const data = {dataForm, categoryId}  
        mutate(data);
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
            <h2 className='text-3xl text-center text-principal'>Nueva Subcategoria</h2>
            <p className='mt-5 text-center'>LLena el siguente formulario para crear una <span className='text-principal'>Subcategoria</span></p>
            
            <form
                className='mt-10 space-y-3 text-center'
                noValidate
                onSubmit={handleSubmit(handleCreateCategory)}
            >
                
                <SubCategoryForm 
                    register={register} 
                    errors={errors} 
                    visibilityDefault={initialValues.visibility}
                />

            <Button type='submit' variant='contained' color='error'>
                Guardar Subcategoria
            </Button>

            </form>
            </Box>
        </Modal>
    </div>
);
}
