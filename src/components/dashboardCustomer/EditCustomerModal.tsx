import { updateCustomer } from "@/api/AuthApi";
import ErrorMessage from "@/components/ErrorMessage";
import { Customer, UserUpdateForm } from "@/types/index";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCloseModal from "../ButtonCloseModal";

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

type EditCustomerModalProps = {
    customer: Customer
}

function EditCustomerModal({customer} : EditCustomerModalProps) {

    // MODAL //
    const navigate = useNavigate();
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const modalCustomer = queryParams.get('editCustomer');
    const show = modalCustomer ? true : false;

    // FORM
    const initialValues: UserUpdateForm = {
        name: customer.user.name,
        address: customer.address || '',
        clietType: customer.clietType || '',
        identification: customer.identification || '',
        phone: customer.phone || '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const {clietType} = watch();

    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: updateCustomer,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({queryKey: ['user']})
            reset()
            navigate(location.pathname, {replace: true})
            toast.success(data)
        },
    })

    const handleUpdateCustomer = (formData : UserUpdateForm) => mutate({formData})

    // useEffect to update form values when customer changes
    useEffect(() => {
        reset({
            name: customer.user.name,
            address: customer.address || '',
            clietType: customer.clietType || '',
            identification: customer.identification || '',
            phone: customer.phone || '',
        });
    }, [customer, reset]);

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
                onSubmit={handleSubmit(handleUpdateCustomer)}
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

                <FormControl fullWidth size="small">
                    <InputLabel id="clientType" color="error">Tipo de persona</InputLabel>
                    <Select
                        labelId="declientType"
                        id="dclientType"
                        label="Tipo de persona"
                        color="error"
                        defaultValue={customer.clietType ? customer.clietType : ''}
                        {...register('clietType', {required: 'Tipo de persona oblogatorio'})}
                    >
                        <MenuItem value={'natural'}>Natural</MenuItem>
                        <MenuItem value={'legal'}>Júridica</MenuItem>
                    </Select>
                    {errors.clietType && (
                        <ErrorMessage>{errors.clietType.message}</ErrorMessage>
                    )}
                </FormControl>
                    
                <FormControl fullWidth>
                    <TextField id="identification"  color="error" size="small"
                        disabled={!clietType}
                        label={
                        !clietType ? 'Seleccione un tipo de persona' : clietType === 'natural' ? 'Número de identificación' : 'NIT'
                        }
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
        
                <FormControl fullWidth>
                    <TextField id="address" label="Dirección" color="error" size="small"
                        placeholder="Ej: Calle 3 #24-54, Barrio Sabanita, casa roja"
                        {...register('address', {
                        required: "La dirección es obligatorio"
                        })}
                    />
                    {errors.address && (
                        <ErrorMessage>{errors.address.message}</ErrorMessage>
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

export default EditCustomerModal