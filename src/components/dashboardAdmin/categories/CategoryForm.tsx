import ErrorMessage from "@/components/ErrorMessage"
import { CategoryFormData } from "@/types/index"
import { FormControl, FormControlLabel, Switch, TextField } from "@mui/material"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type CategoryFormProps = {
    register: UseFormRegister<CategoryFormData> 
    errors: FieldErrors<CategoryFormData>
    visibilityDefault: boolean
}

function CategoryForm({register, errors, visibilityDefault} : CategoryFormProps) {
    return (
        <section className="mb-5 space-y-6">
                <FormControl fullWidth>
                    <TextField 
                        id="name" 
                        label="Nombre de la Categoria" 
                        variant="filled" 
                        {...register("name", {required: 'El nombre de la categoria es obligatoria'})}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </FormControl>
                
                <FormControl>
                    <FormControlLabel
                        control={
                            <Switch {...register("visibility")} id="availability" color="error" defaultChecked={visibilityDefault}/>
                        }
                        label='Visibilidad'
                        labelPlacement="end"
                    />
                </FormControl>
        </section>
    )
}

export default CategoryForm