import { updatePasswordAccount } from "@/api/AuthApi"
import ErrorMessage from "@/components/ErrorMessage"
import { NewPasswordForm } from "@/types/index"
import { Button, FormControl, TextField } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function UpdatePasswordForm() {

    const navigate = useNavigate()
    
    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm<NewPasswordForm>()

    const {password} = watch()

    const queryClient = useQueryClient()
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']});
        toast.warning('Sesión Cerrada')
    };

    const {mutate, isPending} = useMutation({
        mutationFn: updatePasswordAccount,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            reset()
            toast.success(data)
            logout()
            navigate('/auth/login')
        },
    })

    const handleUpdatePassword = (formData : NewPasswordForm) => mutate({formData})
    return (
        <form 
            className="*:space-y-3"
            noValidate
            onSubmit={handleSubmit(handleUpdatePassword)}
        >
            
            <FormControl fullWidth>
                <h3 className="text-center">Ingresa tu nueva contraseña</h3>
                
                <TextField
                    label='Contraseña'
                    variant="filled"
                    color="error"
                    {...register('password', { 
                        required: 'Contraseña obligatoria' ,
                        minLength: {
                            value: 8,
                            message: "La contraseña debe ser mas larga",
                        },
                    })}
                />
                {errors.password && 
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                }
                <TextField
                    label='Confirmar Contraseña'
                    variant="filled"
                    color="error"
                    {...register('password_confirmation', { 
                        required: 'Contraseña obligatoria', 
                        minLength: {
                            value: 8,
                            message: "La contraseña debe ser mas larga",
                        },
                        validate: value => value === password || 'Las Contraseñas no son iguales'
                    })}
                />
                {errors.password_confirmation && 
                    <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                }
                <Button
                    type="submit"
                    color="error"
                    variant="contained"
                    disabled={isPending}
                >
                    Guardar Contraseña
                </Button>
            </FormControl>
        </form>
    )
}

export default UpdatePasswordForm