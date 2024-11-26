import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { RequestConfirmationCodeForm } from "@/types/index";
import { Button, FormControl, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { resquestConfirmationCode } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function RegisterView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate} = useMutation({
        mutationFn: resquestConfirmationCode,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            reset()
        },
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

    return (
        <>
            <h1 className="mb-5 text-xl font-bold text-center">Solicitar Código de Confirmación</h1>
            <p className="mt-5 text-lg text-center">
                Coloca tu e-mail para recibir {''}
                <span className="font-bold text-principal"> un nuevo código</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="p-5 mt-5 space-y-8"
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
                    <Button type="submit" variant="contained" color="error">
                        Nuevo Código
                    </Button>
                </FormControl>
            </form>

            <nav className="flex flex-col mt-5 space-y-4">
                <Link
                    to='/auth/login'
                    className="font-normal text-center underline text-principal"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>
                <Link
                    to='/auth/forgot-password'
                    className="font-normal text-center underline text-principal"
                >
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>
        </>
    )
}