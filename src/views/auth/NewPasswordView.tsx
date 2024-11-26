import NewPasswordForm from "@/components/auth/NewPasswordForm"
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import { ConfirmToken } from "@/types/index"
import { useState } from "react"

function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isvalitToken, setIsValitToken] = useState(false)
    return (
        <>
        <h1 className="mb-5 text-xl font-bold text-center">Restablecer contraseña</h1>


        {!isvalitToken ? 
            <NewPasswordToken 
                token={token} 
                setToken={setToken}
                setIsValitToken={setIsValitToken}
            /> : 
            <NewPasswordForm
                token={token}
            /> }
        </>
    )
}

export default NewPasswordView