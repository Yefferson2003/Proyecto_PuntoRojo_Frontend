import { updateProduct, uploadImageToCloudinary } from '@/api/ProductApi';
import { Product, ProductFormData } from '@/types/index';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from './ProductForm';
import { useState } from 'react';
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

type EditProductModalProps = {
    product: Product
    productId: Product['id']
    page: number
    rowsPerPage: number
    search: string
}

export default function EditProductModal({product, productId, page, rowsPerPage, search}: EditProductModalProps) {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    
    // MODAL //
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const modalProduct = queryParams.get('editProduct');
    const show = modalProduct ? true : false;

    const initialValues : ProductFormData = {
        name: product.name,
        nit: product.nit,
        description: product.description,
        availability: product.availability,
        priceBefore: +product.priceBefore,
        priceAfter: +product.priceAfter,
        iva: product.iva,
        offer: product.offer,
        subCategoryId: product.subCategoryId,
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({defaultValues: initialValues});
    
    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: updateProduct,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['searchProductsAdmin', search, page, rowsPerPage]})
            queryClient.invalidateQueries({queryKey: ['product', productId]})
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
    
    const handleUpdateProduct = async (formData: ProductFormData) => {
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

        const data = {formData: updatedFormData, productId}
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
            <h2 className='text-3xl text-center text-principal'>Ver / Editar Producto</h2>
            <p className='mt-5 text-center'>LLena el siguente formulario para editar un <span className='text-principal'>Producto</span></p>
            
            <form
                className='mt-10 space-y-3 text-center'
                onSubmit={handleSubmit(handleUpdateProduct)}
            >
            
            <ProductForm 
                register={register} 
                errors={errors} 
                availabilityDefault={product.availability}
                offer={product.offer}
                subcategoryId={product.subCategoryId}
                handleImageChange={handleImageChange}
            />

            <Button type='submit' variant='contained' color='error'
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
