import { login } from "@/api/AuthApi";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuth } from "@/hooks/useAuth";
import { UserLoginForm } from "@/types/index";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginView() {

  const [showPassword, setShowPassword] = useState(false);
  const {data, refetch} = useAuth()
  const token = localStorage.getItem('AUTH_TOKEN')
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const {mutate, isPending} = useMutation({
    mutationFn: login,
    onError(error) {
      toast.error(error.message)
    },
    onSuccess() {
      toast.success("Iniciando sessión...",{toastId:"dashboard-admin-tittle"})
      reset()
      refetch()
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  // Escuchar cambios en `useAuth` para redirigir según el rol
  useEffect(() => {
    if (data?.user?.rol) {
      const rol = data.user.rol;

      if(token) {
        switch (rol) {
          case 'admin':
            navigate('/dashboard+admin');
            break;
          case 'deliveryman':
            navigate('/dashboard+deliveryMan');
            break;
          default:
            navigate('/');
            break;
      }

      }
    }
  }, [data, navigate, token]);

  return (
    <>
      <h1 className="mb-5 text-xl font-bold text-center">Inicia sesión</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-6"
        noValidate
        autoComplete="off"
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
            {...register('password', { required: 'Contraseña obligatoria' })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </FormControl>
        
        <FormControl fullWidth>
          <Button type="submit" variant="contained" color="error"
            id="button-login"
            disabled={isPending}
          >
            Iniciar Sesión
          </Button>
        </FormControl>
      </form>

      <nav className="flex flex-col mt-5 space-y-4 text-center">
        <Link to={'/auth/register'}
          id="link-register"
        >
          No tienes cuenta? <span className="underline text-principal">Crear una</span>
        </Link>
        <Link to={'/auth/forgot-password'}
          id="forgot-password"
        >
          Olvidaste tu contraseña? <span className="underline text-principal">Restablecer</span>
        </Link>
      </nav>
    </>
  )
}