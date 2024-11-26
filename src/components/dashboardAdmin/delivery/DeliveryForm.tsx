import ErrorMessage from "@/components/ErrorMessage"
import { DeliveryManRegistrationForm } from "@/types/index"
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form"

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

type DeliveryFormProps = {
    register: UseFormRegister<DeliveryManRegistrationForm>
    errors: FieldErrors<DeliveryManRegistrationForm>
    watch: UseFormWatch<DeliveryManRegistrationForm>
}

function DeliveryForm({register, errors, watch} :  DeliveryFormProps) {

    //SHOW PASSWORD
    const [showPassword, setShowPassword] = useState(true);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {password} = watch()
    
    return (
        <section className="mb-5 space-y-6">
            <FormControl size="small" fullWidth>
                <div className="flex flex-col space-y-4">
                <TextField id="name" label="Nombre" color="error" size="small"
                    {...register('name', {
                    required: "El nombre es obligatorio"
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}

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
                
                <TextField id="identification" label="Cedula" color="error" size="small"
                    {...register('identification', {
                    required: "La cedula es obligatoria"
                    })}
                />
                {errors.identification && (
                    <ErrorMessage>{errors.identification.message}</ErrorMessage>
                )}
                
                <FormControl size="small" fullWidth>
                    <InputLabel  color="error" htmlFor="password">Contraseña</InputLabel>
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
                </div>
            </FormControl>

        </section>
    )
}

export default DeliveryForm