import { validateToken } from '@/api/AuthApi'
import { ConfirmToken } from '@/types/index'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { Dispatch } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

type NewPasswordTokenPops = {
    token: ConfirmToken['token']
    setToken: Dispatch<React.SetStateAction<string>>
    setIsValitToken: Dispatch<React.SetStateAction<boolean>>
}

function NewPasswordToken({token, setToken, setIsValitToken} : NewPasswordTokenPops) {

    const {mutate} = useMutation({
        mutationFn: validateToken,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            setIsValitToken(true)
        },
    })
    
    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }
    const handleCompleted = (token: ConfirmToken['token']) => mutate({token})
    
    return (
        <div>
        <p>Ingresa el código que recibiste {''}
            <span className="text-principal">por email</span>
        </p>
        <form
            className="p-5 mt-5 space-y-8 bg-slate-200"
        >
            <label
            className="block text-2xl font-normal text-center"
            >Código de 6 dígitos</label>

            <div className="flex justify-center gap-5">
                <PinInput value={token} onChange={handleChange} onComplete={handleCompleted}>
                    <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-principal"/>
                    <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-principal"/>
                    <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-principal"/>
                    <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-principal"/>
                    <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-principal"/>
                    <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-principal"/>
                </PinInput>
            </div>

        </form>

        <nav className="flex flex-col mt-10 space-y-4">
            <Link
            to='/auth/new-code'
            className="font-normal text-center underline text-principal"
            >
            Solicitar un nuevo Código
            </Link>
        </nav>
        </div>
    )
}

export default NewPasswordToken