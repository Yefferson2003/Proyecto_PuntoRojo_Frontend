import { getCategories } from "@/api/CategoryApi";
import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";
import { ProductFormData } from "@/types/index";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Button, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, styled, Switch, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type ProductFormProps = {
    register: UseFormRegister<ProductFormData>
    errors: FieldErrors<ProductFormData>
    availabilityDefault?: boolean
    offer?: boolean
    subcategoryId?: string | number
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function ProductForm({register, errors, availabilityDefault, offer, subcategoryId, handleImageChange} : ProductFormProps) {

    const {data, isLoading} = useQuery({
        queryKey: ['categoriesSelect'],
        queryFn: getCategories
    })

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [filteredSubcategories, setFilteredSubcategories] = useState<{ id: number, name: string }[]>([]);

    useEffect(() => {
        if (subcategoryId && data) {
            
            const categoryContainingSubcategory = data.find(category => 
                category.subCategories.some(subCategory => subCategory.id === subcategoryId)
            );
            
            if (categoryContainingSubcategory) {
                setSelectedCategory(categoryContainingSubcategory.id); 
                setFilteredSubcategories(categoryContainingSubcategory.subCategories); 
            }
        }
    }, [subcategoryId, data]);

    // Manejador de selección de categoría
    const handleCategoryChange = (e: SelectChangeEvent<number>) => {
        const categoryId = e.target.value as number;
        setSelectedCategory(categoryId);

        // Filtrar las subcategorías según la categoría seleccionada
        const selectedCat = data?.find(category => category.id === categoryId);
        setFilteredSubcategories(selectedCat ? selectedCat.subCategories : []);
    };

    if (isLoading) return <div className="my-10 text-center"><Loader/></div>
    if (data) return (
        <section className="mb-5 space-y-6">
            <FormControl size="small"  fullWidth>
                <div className="flex flex-col space-y-4">
                    <TextField size="small"  
                        id="name" 
                        label="Nombre del Producto" 
                        variant="outlined" 
                        {...register("name", {required: 'El nombre es obligatoria'})}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                    
                    <TextField size="small"
                        id='nit'
                        label='Código de Barra'
                        variant='outlined'
                        {...register("nit", 
                            {
                                required: 'El Código de barra es obligatoria',
                                maxLength: { value: 15, message: "El valor máximo es 15" },
                                minLength: { value: 1, message: "El valor minimo es 1" }
                            }
                        )}
                    />
                    {errors.nit && (
                        <ErrorMessage>{errors.nit.message}</ErrorMessage>
                    )}

                    <TextField size="small"
                        id='description'
                        label='Descripción (Opcional)'
                        variant='outlined'
                        multiline
                        maxRows={4}
                        {...register("description")}
                    />

                    <TextField size="small"
                        id='priceBefore'
                        label='Precio de oferta'
                        variant='outlined'
                            
                        {...register("priceBefore", {
                            required: 'Este elemento es obligatorio',
                            pattern: {
                                value: /^[0-9]+$/, // Expresión regular para solo números
                                message: "Solo se permiten números"
                            }
                        })}
                    />
                    {errors.priceBefore && (
                        <ErrorMessage>{errors.priceBefore.message}</ErrorMessage>
                    )}

                    <TextField size="small"
                        id='priceAfter'
                        label='Precio'
                        variant='outlined'
                        fullWidth
                        {...register("priceAfter", {
                            required: 'El precio es obligatoria',
                            pattern: {
                                value: /^[0-9]+$/, // Expresión regular para solo números
                                message: "Solo se permiten números"
                            }
                        })}
                    />
                    {errors.priceAfter && (
                        <ErrorMessage>{errors.priceAfter.message}</ErrorMessage>
                    )}

                    <TextField size="small"
                        id='iva'
                        label='IVA % (Impuesto de valor agregado)'
                        variant='outlined'
                        fullWidth
                        {...register("iva", {
                            required: 'El valor del iva es obligatoria',
                            pattern: {
                                value: /^[0-9]+$/, // Expresión regular para solo números
                                message: "Solo se permiten números"
                            },
                            min: { value: 1, message: "El valor mínimo es 1" },
                            max: { value: 100, message: "El valor máximo es 100" }
                        })}
                    />
                    {errors.iva && (
                        <ErrorMessage>{errors.iva.message}</ErrorMessage>
                    )}

                    <FormControl>
                        <InputLabel id='category' >Categoria</InputLabel>
                        <Select
                            value={selectedCategory ?? ''}
                            onChange={handleCategoryChange}
                            variant="outlined"
                            id="select-category"
                            label='categoria'
                            required
                        >
                        {data.map(category => (
                            <MenuItem id={category.id.toString()} key={category.id} value={category.id}>
                            {category.name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>

                    {/* Select de Subcategoría */}
                    {selectedCategory && (
                        <FormControl fullWidth style={{ marginTop: '16px' }}>
                        <InputLabel>Subcategoría</InputLabel>
                        <Select
                            variant="outlined"
                            label="Subcategoría"
                            id="subCategoryId"
                            defaultValue={subcategoryId}
                            {...register("subCategoryId", {required: 'La subcategoría es obligatoria'})}
                        >
                            {filteredSubcategories.map(subCategory => (
                            <MenuItem id={subCategory.id.toString()+'subcategory'} key={subCategory.id} value={subCategory.id}>
                                {subCategory.name}
                            </MenuItem>
                            ))}
                        </Select>
                        {errors.subCategoryId && (
                            <ErrorMessage>{errors.subCategoryId.message}</ErrorMessage>
                        )}
                        </FormControl>
                    )}

                </div>
            </FormControl>

            <FormControl>
                <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch  {...register("availability")} id="availability" color="error" defaultChecked={availabilityDefault}/>
                    }
                    label='Disponibilidad'
                    labelPlacement="end"
                />
                <FormControlLabel
                    control={
                        <Switch {...register("offer")} id="offer" color="error" defaultChecked={offer}/>
                    }
                    label='Oferta'
                    labelPlacement="end"
                />
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudDownloadIcon />}
                        color="error"
                    >
                        Cargar Imagen
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                </FormGroup>
                
            </FormControl>
        </section>
    )
}

export default ProductForm