import ErrorMessage from "@/components/ErrorMessage"
import { FormMessage } from "@/types/index"
import { FormControl, TextField } from "@mui/material"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type MessageForm = {
    register: UseFormRegister<FormMessage>
    errors: FieldErrors<FormMessage>
}

function MessageForm({register, errors} : MessageForm) {
    return (
        <div>
            <FormControl size="small" fullWidth>
                <TextField 
                    id="name" 
                    label="Mensaje" 
                    color="error" 
                    size="small"
                    {...register('message', {
                    required: "El Mensaje es obligatorio"
                    })}
                />
                {errors.message && (
                    <ErrorMessage>{errors.message.message}</ErrorMessage>
                )}
            </FormControl>
        </div>
    )
}

export default MessageForm