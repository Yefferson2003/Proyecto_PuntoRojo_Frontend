import { getProduts } from "@/api/ProductApi";
import AddProductModal from "@/components/dashboardAdmin/products/AddProductModal";
import EditProductData from "@/components/dashboardAdmin/products/EditProductData";
import ProductList from "@/components/dashboardAdmin/products/ProductsList";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SearchProductForm = {
    search: string;
};

function ProductView() {
    const navigate = useNavigate();
    const { register, watch, handleSubmit } = useForm<SearchProductForm>();
    const search = watch("search", "");

    // Páginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data } = useQuery({
        queryKey: ["searchProductsAdmin", search, page, rowsPerPage],
        queryFn: () => getProduts({ search, page: page + 1, limit: rowsPerPage }),
    });

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleSearch =  () => {
        
    }

    return (
        <section className="w-full">
        <h1 className="text-4xl font-bold text-center uppercase text-principal">Productos</h1>
        <p className="mt-3 text-lg">Aquí podrás visualizar y administrar los <span className="font-bold text-principal">Productos</span> presentes en la plataforma</p>
        
        <Button id="button-add-product"
            sx={{ marginTop: '20px' }}
            onClick={() => navigate(location.pathname + '?newProduct=true')}
            color="error"
            variant="contained"
        >
            Agregar Producto
        </Button>
        
        <Box
            component="form"
            onSubmit={handleSubmit(handleSearch)}
            sx={{ display: "flex", gap: 2, alignItems: "center", my: 2, p: 2, bgcolor: 'white', borderRadius: '4' }}
        >
            <SearchIcon color="error"/>
            <TextField
                label="Buscar"
                color="error"
                variant="filled"
                size="small"
                fullWidth
                id="search"
                placeholder="Escribe tu búsqueda aquí..."
                {...register("search")}
            />
        </Box>
        
        <h2 className="mb-5 text-3xl">Lista de Productos</h2>
        
        {data && (
            <ProductList
                products={data.products}
                onPageChange={handlePageChange}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                totalProducts={data.total}
                page={page}
                rowsPerPage={rowsPerPage}
                search={search}
            />
        )}
        
        <AddProductModal/>
        
        {data && (
            <EditProductData
                page={page}
                rowsPerPage={rowsPerPage}
                search={search}
            />
        )}
        </section>
    );
}

export default ProductView;
