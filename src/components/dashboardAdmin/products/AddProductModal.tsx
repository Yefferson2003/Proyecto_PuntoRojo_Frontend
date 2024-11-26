import { createProduct, uploadImageToCloudinary } from '@/api/ProductApi';
import { ProductFormData } from '@/types/index';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from './ProductForm';
import ButtonCloseModal from '@/components/ButtonCloseModal';

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

export default function AddProductModal() {

    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    // MODAL //
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const modalProduct = queryParams.get('newProduct');
    const show = modalProduct ? true : false;

    const initialValues : ProductFormData = {
        name: '',
        nit: '',
        description: '',
        availability: true,
        priceBefore: '',
        priceAfter: '',
        iva: '',
        offer: false,
        subCategoryId: '',
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({defaultValues: initialValues});
    
    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: createProduct,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['searchProductsAdmin']})
            navigate(location.pathname, {replace: true})
            reset()
        },
    })
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
    
        if (file) {
            setSelectedImage(file)
        }
        
    };

    const handleCreateProduct = async (formData: ProductFormData) => {
        
        const updatedFormData = {
            ...formData,
            priceAfter: +formData.priceAfter,
            priceBefore: +formData.priceBefore,
            iva: +formData.iva,
        };

        if (selectedImage) {
            try {
                const imageUrl = await uploadImageToCloudinary(selectedImage);
                updatedFormData.imgUrl = imageUrl; 
            } catch (error) {
                console.error("Error al subir la imagen", error);
                toast.error('Error al Cargar la Imagen')
                return; 
            }
        }

        mutate({ formData: updatedFormData });
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
            <h2 className='text-3xl text-center text-principal'>Nuevo Producto</h2>
            <p className='mt-5 text-center'>LLena el siguente formulario para crear un <span className='text-principal'>Producto</span></p>
            
            <form
                className='mt-10 space-y-3 text-center'
                onSubmit={handleSubmit(handleCreateProduct)}
            >
            
                <ProductForm 
                    register={register} 
                    errors={errors} 
                    availabilityDefault={true}
                    handleImageChange={handleImageChange}
                />

            <Button id='button-add-product' type='submit' variant='contained' color='error'
                // sx={{zIndex: '100000'}}
                disabled={isPending}
            >
                Guardar Producto
            </Button>

            </form>
            </Box>
        </Modal>
    </div>
);
}
