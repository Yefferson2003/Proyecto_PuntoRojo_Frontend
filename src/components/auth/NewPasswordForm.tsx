
import type { ConfirmToken, NewPasswordForm } from "@/types/index"
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/api/AuthApi";
import { toast } from "react-toastify";

type NewPasswordFormProsp = {
    token :  ConfirmToken['token']
}

function NewPasswordForm({token}:NewPasswordFormProsp) {
    

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const navigate = useNavigate()
    
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
        mutationFn: updatePassword,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            reset()
            navigate('/auth/login')
        },
    })


    const handleNewPassword = (formData: NewPasswordForm) => mutate({token, formData })

    const password = watch('password');

    return (
        <div>
            <p>Ingresa la nueva {''}
            <span className="text-principal">contraseña</span>
            </p>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="mt-5 space-y-6"
                noValidate
                autoComplete="off"
            >

            <FormControl fullWidth size="small">
                <InputLabel color="error" htmlFor="password">Contraseña</InputLabel>
                <OutlinedInput
                    color="error"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Contraseña"
                {...register('password', { 
                required: 'Contraseña obligatoria' ,
                minLength: {
                    value: 8,
                    message: "La contraseña debe ser mas larga",
                },
                })}
            />
            {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            </FormControl>
        
            <FormControl fullWidth size="small">
                <InputLabel color="error" htmlFor="password_confirmation">Confirmar contraseña</InputLabel>
                <OutlinedInput
                    color="error"
                    id="password_confirmation"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label={
                            showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Confirmar contraseña"
                    {...register('password_confirmation', { 
                    required: 'Contraseña obligatoria', 
                    minLength: {
                        value: 8,
                        message: "La contraseña debe ser mas larga",
                    },
                    validate: value => value === password || 'Las Contraseñas no son iguales'
                    })}
                />
                {errors.password_confirmation && (
                    <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                )}
            </FormControl>

            <FormControl fullWidth>
                <Button type="submit" variant="contained" color="error">
                    Guardar Contraseña
                </Button>
            </FormControl>
            </form>
            
        </div>
    )
}

export default NewPasswordForm