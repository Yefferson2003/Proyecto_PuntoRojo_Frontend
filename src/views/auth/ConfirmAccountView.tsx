import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useState } from "react";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {

    const [token, setToken] = useState<ConfirmToken['token']>('')
    const navigate = useNavigate()

    const {mutate} = useMutation({
        mutationFn: confirmAccount,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data)
            navigate('/auth/login')
        },
    })

    const handleChange = (token : ConfirmToken['token']) => {
        setToken(token)
    }
    const handleCompleted = (token : ConfirmToken['token']) => mutate({token})

    return (
        <>
        <h1 className="mb-5 text-xl font-bold text-center">Confirma tu Cuenta</h1>
        <p className="mt-5 text-lg text-center">
            Ingresa el código que recibiste {''}
            <span className="font-bold text-principal"> por e-mail</span>
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

        </>
    )
}