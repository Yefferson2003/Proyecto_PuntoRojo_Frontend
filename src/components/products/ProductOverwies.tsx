import { getProductById } from "@/api/ProductApi";
import { formatCurrencyCOP } from "@/utils/index";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Breadcrumbs, Button, FormControl, InputLabel, Link, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import HorizantalProductList from "./HorizantalProductList";
import { useRootStore } from "../../stores/rootStore";
import { toast } from "react-toastify";


function ProductOverwies() {
    
    const {categoryId, subCategoryId, category, subCategory, productId } = useParams<{ 
        subCategoryId: string, 
        categoryId: string,
        category: string,
        subCategory: string
        productId: string
    }>();

    const [quantity, setQuantity] = useState('1');
    const addToCart = useRootStore(state => state.addToCart)

    const handleChange = (e: SelectChangeEvent<string>) => {
        setQuantity(e.target.value);
    };
    
    const {data, isError} = useQuery({
        queryKey: [ 'productOverwies', productId],
        queryFn: () => productId ? getProductById({productId: +productId}) : null,
        enabled: !!productId,
        retry: false
    })


    if (isError) return <Navigate to={'/404'}/>
    if (data) return (
        <section className="w-full px-10">

            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Inicio
                </Link>

                {category && categoryId && (
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href={`/collections/${category.replace(/ /g, '-')}/${categoryId}`}
                    >
                        <ChecklistIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {category}
                    </Link>
                )}

                {subCategory && subCategoryId && (
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href={`/collections/${category?.replace(/ /g, '-')}/${subCategory.replace(/ /g, '-')}/${subCategoryId}`}
                    >
                        <ChecklistIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {subCategory}
                    </Link>
                )}

                <Typography
                sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
                >
                    <InventoryIcon sx={{ mr: 0.5 }} fontSize="inherit" color="error" />
                    <h2 className="text-principal" >{data.name}</h2>
                </Typography>
            </Breadcrumbs>

            <section className="grid w-full gap-4 mt-10 md:grid-cols-2">
                <div className="bg-white">
                    <img className="w-full p-2 rounded-xl" src={data.imgUrl} alt="imagen producto" />
                </div>
                
                <div className="w-full space-y-4 md:space-y-4">
                    <h2 className="text-3xl uppercase text-principal">{data.name}</h2>

                    <div>
                        {data.priceBefore && <h3 className="text-2xl line-through text-slate-600">{formatCurrencyCOP(+data.priceBefore)}</h3>}
                        <h3 className="text-2xl">{formatCurrencyCOP(+data.priceAfter)}</h3>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row">
                    <FormControl sx={{width: {xs:'full', sm: '40%'}}}>
                        <InputLabel id="demo-simple-select-label">Cantidad</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="select-quantity"
                            value={quantity}
                            label="Cantidad"
                            onChange={handleChange}
                        >
                            {[...Array(10).keys()].map((value) => (
                                <MenuItem id={value.toString()} key={value + 1} value={value + 1}>
                                    {value + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button fullWidth variant="contained" color="error" 
                        id="button-add-cart"
                        endIcon={<AddShoppingCartIcon/>}
                        onClick={() => {
                            addToCart(data, +quantity)
                            toast.success('Porducto agregado correctamente')
                        }}
                    >Agregar al Carrito</Button>
                    </div>
                        
                    <div>
                        {data.description && <h2 className="mb-4 text-2xl text-principal">Descripción</h2>}
                        <p className="text-sm text-justify">{data.description}</p>
                    </div>

                </div>
            </section>
            
            <h2 className="my-5 text-2xl text-center text-principal md:text-start">Productos Sugeridos</h2>
            
            <HorizantalProductList subCategoryId={+data.subCategoryId}/>

        </section>
    )
}

export default ProductOverwies