import { createAccount } from "@/api/AuthApi";
import ErrorMessage from "@/components/ErrorMessage";
import { UserRegistrationForm } from "@/types/index";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function LoginView() {
    // CHECKED POLICES
  const [isChecked, setChecked] = useState(false);

  const handleCkeckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  
  // SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // FORM
  const initialValues: UserRegistrationForm = {
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    address: '',
    clietType: '',
    identification: '',
    phone: ''
  }
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues })
  const {clietType, password} = watch();

  const {mutate, isPending} = useMutation({
    mutationFn: createAccount,
    onError(error) {
      toast.error(error.message)
    },
    onSuccess(data) {
      toast.success(data)
      reset()
    },
  })

  const handleLogin = (formData: UserRegistrationForm) => {
    // toast.error('gola', {autoClose: 60000})
    mutate(formData)
  }

  return (
    <>
      <h1 className="mb-5 text-xl font-bold text-center">Regístrate y accede a más...</h1>
    
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-6"
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
          <TextField id="name" label="Nombre" color="error" size="small"
            {...register('name', {
              required: "El nombre es obligatorio",
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.-]+$/, // Letras, espacios, guiones y puntos
                message: "El nombre solo puede contener letras, espacios, guiones o puntos",
              },
            })}
            
          />
          {errors.name && (
            <ErrorMessage id="errorName">{errors.name.message}</ErrorMessage>
          )}
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="clientType">Tipo de persona</InputLabel>
          <Select
            labelId="declientType"
            id="dclientType"
            label="Tipo de persona"
            {...register('clietType', {required: 'Tipo de persona oblogatorio'})}
          >
            <MenuItem id="option-natural" value={'natural'}>Natural</MenuItem>
            <MenuItem id="option-legal" value={'legal'}>Júridica</MenuItem>
          </Select>
          {errors.clietType && (
            <ErrorMessage id="error-tipo-cliente">{errors.clietType.message}</ErrorMessage>
          )}
        </FormControl>
        
        <FormControl fullWidth>
          <TextField id="identification"  color="error" size="small"
            disabled={!clietType}
            label={
              !clietType ? 'Seleccione un tipo de persona' : clietType === 'natural' ? 'Número de identificación' : 'NIT'
            }
            {...register('identification', {
              required: "El número de identificación es obligatorio",
              pattern: {
                value: /^[0-9]+$/, // Solo números
                message: "El número de identificación debe contener solo números",
              },
            })}
          />
          {errors.identification && (
            <ErrorMessage id="error-identification">{errors.identification.message}</ErrorMessage>
          )}
        </FormControl>
        
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
            <ErrorMessage id="error-email">{errors.email.message}</ErrorMessage>
          )}
        </FormControl>
        
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
            <ErrorMessage id="error-password">{errors.password.message}</ErrorMessage>
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
            <ErrorMessage id="error-password-confirmation">{errors.password_confirmation.message}</ErrorMessage>
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
            <ErrorMessage id="error-phone">{errors.phone.message}</ErrorMessage>
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
            <ErrorMessage id="error-address">{errors.address.message}</ErrorMessage>
          )}
        </FormControl>
        
        <div >
          <div className="flex flex-row items-center mx-auto text-sm text-center text-wrap">
            <Checkbox color="error" onChange={handleCkeckedChange} checked={isChecked}/>
            <p>
              Politicas de  
                <Link className="underline hover:text-red-400 text-principal" to={'/polices/privacy'}> Politicas De Privacidad </Link> 
              y 
                <Link className="underline hover:text-red-400 text-principal" to={'/polices/service'}> Politicas Del Servicio</Link>
            </p>
          </div>
        </div>
        
        <FormControl fullWidth>
          <Button type="submit" variant="contained" color="error"
            disabled={isPending || !isChecked}
            id="button-register"
          >
            Registrarme
          </Button>
        </FormControl>
      </form>

      <nav className="flex flex-col mt-5 space-y-4 text-center">
        <Link to={'/auth/login'}
        
        >
          Ya tienes cuenta?<span className="underline text-principal"> Inicia Sesión</span>
        </Link>
        <Link to={'/auth/forgot-password'}
        
        >
          Olvidaste tu contraseña? <span className="underline text-principal">Restablecer</span>
        </Link>
      </nav>
    </>
  )
}

