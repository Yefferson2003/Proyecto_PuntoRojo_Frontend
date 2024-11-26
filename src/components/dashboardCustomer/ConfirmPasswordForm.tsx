import { ValidatePassword } from "@/api/AuthApi"
import ErrorMessage from "@/components/ErrorMessage"
import { UserPasswordForm } from "@/types/index"
import { Button, FormControl, TextField } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

type ConfirmPasswordFormProps = {
    setIsConfirmPassword: Dispatch<SetStateAction<boolean>>
}

function ConfirmPasswordForm({setIsConfirmPassword} : ConfirmPasswordFormProps) {

    const {register, handleSubmit, reset, formState: {errors}} = useForm<UserPasswordForm>()

    const {mutate, isPending} = useMutation({
        mutationFn: ValidatePassword,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            reset()
            setIsConfirmPassword(true)
            toast.success(data)
        },
    })

    const handleConfirmPassword = (formData : UserPasswordForm) => mutate({formData})
    
    return (
        
        <form 
            className="*:space-y-3"
            noValidate
            onSubmit={handleSubmit(handleConfirmPassword)}
        >
            <FormControl fullWidth>
                <h3 className="text-center">Confirma tu contraseña para su cambio</h3>
                <TextField
                    label='Contraseña'
                    variant="filled"
                    color="error"
                    {...register('password', {required: 'Contraseña Obligatoria'})}
                />
                {errors.password && 
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                }
                <Button
                    type="submit"
                    color="error"
                    variant="contained"
                    disabled={isPending}
                >
                    Confirmar Contraseña
                </Button>
            </FormControl>
        </form>
    )
}

export default ConfirmPasswordForm