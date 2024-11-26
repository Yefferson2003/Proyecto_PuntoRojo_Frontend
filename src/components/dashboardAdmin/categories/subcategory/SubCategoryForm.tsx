import ErrorMessage from "@/components/ErrorMessage"
import { SubCategoryFormData } from "@/types/index"
import { FormControl, FormControlLabel, Switch, TextField } from "@mui/material"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type SubCategoryFormProps = {
    register: UseFormRegister<SubCategoryFormData> 
    errors: FieldErrors<SubCategoryFormData>
    visibilityDefault: boolean
}

function SubCategoryForm({register, errors, visibilityDefault} : SubCategoryFormProps) {
    return (
        <section className="mb-5 space-y-6">
            <div>
                <FormControl fullWidth>
                    <TextField 
                        id="name" 
                        label="Nombre de la Subcategoria" 
                        variant="filled" 
                        {...register("name", {required: 'El nombre de la subcategoria es obligatoria'})}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </FormControl>

                <FormControl sx={{marginTop: '10px'}}>
                    <FormControlLabel
                        control={
                            <Switch {...register("visibility")} id="availability" color="error" defaultChecked={visibilityDefault}/>
                        }
                        label='Visibilidad'
                        labelPlacement="end"
                    />
                </FormControl>
            </div>
        </section>
    )
}

export default SubCategoryForm