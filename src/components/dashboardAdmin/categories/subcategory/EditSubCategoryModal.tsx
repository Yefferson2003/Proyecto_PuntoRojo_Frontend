
import { updateSubCategory } from '@/api/SubCategoryApi';
import { Category, SubCategory, SubCategoryFormData } from '@/types/index';
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

type EditSubCategoryModalProps = {
    data: SubCategory
    categoryId: Category['id']
}

export default function EditCategoryModal({data, categoryId}: EditSubCategoryModalProps) {

    // MODAL //
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const modalSubCategory = queryParams.get('editSubCategory');
    const subCategoryId = Number(modalSubCategory)
    const show = modalSubCategory ? true : false;
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm(
        { defaultValues: {
            name: data.name,
            visibility: data.visibility
    }});
    
    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: updateSubCategory,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['categories']})
            queryClient.invalidateQueries({queryKey: ['category', subCategoryId]})
            navigate(location.pathname, {replace: true})
            reset()
        },
    })

    const handleUpdateSubCategory = (dataForm: SubCategoryFormData) => {
        const data = {categoryId, subCategoryId, dataForm}
        mutate(data)
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
                <h2 className='text-3xl text-center text-principal'>Editar Categoria</h2>
                <p className='mt-5 text-center'>LLena el siguente formulario para editar una <span className='text-principal'>Categoria</span></p>
                
                <form
                    className='mt-10 space-y-3 text-center'
                    noValidate
                    onSubmit={handleSubmit(handleUpdateSubCategory)}
                >
                    
                    <SubCategoryForm 
                        register={register} 
                        errors={errors} 
                        visibilityDefault={data.visibility}
                    />

                <Button type='submit' variant='contained' color='error'
                    disabled={isPending}
                >
                    Editar Categoria
                </Button>

                </form>
                </Box>
            </Modal>
        </div>
    );
}
