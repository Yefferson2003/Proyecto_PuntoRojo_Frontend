import { Product } from "@/types/index";
import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import { useMemo, useState } from "react";
import ListProducts from "./ListProduct";

type ListProductsFiltersProps = {
    productsBySub?: Product[]
    productsByCat?: Product[]
    productsBySearch?: Product[]
    productsByOffer?: Product[]
    count?: number
    handlePageChange?: (event: unknown, newPage: number) => void
    page?: number
}

function ListProductsFilters({productsByCat, productsBySub, productsBySearch, productsByOffer, count, handlePageChange, page} : ListProductsFiltersProps) {

    const [orderOption, setOrderOption] = useState(1)

    const handleChange = (e: SelectChangeEvent<number>) => {
        setOrderOption(+e.target.value)
    }

    const sortedProducts = useMemo(() => {

        const products: Product[] = productsBySub ? [...productsBySub] : productsByCat ? [...productsByCat] : productsBySearch ? [...productsBySearch] : productsByOffer ? [...productsByOffer]: [];
        
        return products.sort((a, b) => {
            switch(orderOption) {
                case 1:
                    return a.name.localeCompare(b.name); // Alfabéticamente, A-Z
                case 2:
                    return b.name.localeCompare(a.name); // Alfabéticamente, Z-A
                case 3:
                    return +b.priceAfter - +a.priceAfter; // Precio, Mayor a Menor
                case 4:
                    return +a.priceAfter - +b.priceAfter; // Precio, Menor a Mayor
                default:
                    return 0;
            }
        });
    }, [orderOption, productsByCat, productsBySearch, productsBySub, productsByOffer]);
    
    return (
        <div>

        <section className="w-full p-4 my-5 bg-white rounded-sm">
        <FormControl fullWidth>
            <InputLabel color="error">Ordenar por:</InputLabel>
            <Select color="error"
                value={orderOption}
                label='Ordenar por:'
                onChange={handleChange}
                size="medium"
            >
                <MenuItem value={1}>Alfabéticamente, A-Z</MenuItem>
                <MenuItem value={2}>Alfabéticamente, Z-A</MenuItem>
                <MenuItem value={3}>Precio, Mayor a Menor</MenuItem>
                <MenuItem value={4}>Precio, Menor a Mayor</MenuItem>
                
            </Select>
        </FormControl>
        </section>

        <section className="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
            <ListProducts products={sortedProducts}/>
        </section>
        
        {page && 
            <Pagination
                onChange={handlePageChange}
                page={page}
                count={count}
                sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
            />
        }
        
        </div>
    )
}

export default ListProductsFilters