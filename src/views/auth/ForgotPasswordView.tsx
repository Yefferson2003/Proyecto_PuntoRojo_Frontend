import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import { Button, FormControl, TextField } from "@mui/material";
import { ForgotPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    
    const {mutate} = useMutation({
        mutationFn: forgotPassword,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            reset()
        },
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)


    return (
        <>
        <h1 className="mb-5 text-xl font-bold text-center">Restablecer contraseña</h1>
        <form
            onSubmit={handleSubmit(handleForgotPassword)}
            className="space-y-6"
            noValidate
        >
            <FormControl fullWidth>
                <TextField id="email" label="Email" color="error" size="small"
                    {...register('email', {
                    required: "El Email es obligatorio",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                    },
                    })}
                />
                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </FormControl>

            <FormControl fullWidth>
                <Button id="button-forgot-password" type="submit" variant="contained" color="error">
                    Enviar Instrucciones
                </Button>
            </FormControl>
        </form>

        <nav className="flex flex-col mt-5 space-y-4 text-center">
            <Link to={'/auth/login'}
            
            >
                Ya tienes cuenta?<span className="underline text-principal"> Inicia Sesión</span>
            </Link>
            <Link to={'/auth/register'}
            
            >
                No tienes cuenta? <span className="underline text-principal">Crear una</span>
            </Link>
        </nav>
        </>
    )
}