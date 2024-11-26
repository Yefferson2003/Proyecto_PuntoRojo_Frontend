import { getCustomers } from "@/api/CustomerApi"
import CustomerList from "@/components/dashboardAdmin/customers/CustomerList"
import Loader from "@/components/Loader";
import { Box, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { useForm } from "react-hook-form";
import SearchIcon from '@mui/icons-material/Search';

function CustomersView() {

    // Páginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const initialValues: {search: string} = {
        search: ''
    }

    const { register, watch, handleSubmit } = useForm({defaultValues: initialValues});
    const search = watch("search", "");

    const {data, isLoading} = useQuery({
        queryKey: ['customers', search, page, rowsPerPage],
        queryFn: () => getCustomers({ search, page: page + 1, limit: rowsPerPage })
    })

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        console.log(event);
        setPage(newPage);
    };

    const handleSearch =  () => {
    }
    
    return (
        <section className="w-full text-center">
            <h1 className="text-4xl font-bold text-center uppercase text-principal">Clientes</h1>
            <p className="mt-3 text-lg text-start">Aquí podrás visualizar, los <span className="font-bold text-principal">Clientes </span> y sus <span className="font-bold text-principal">Reseñas</span></p>

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

            <h2 className="my-5 text-2xl font-bold text-start">Lista de Clientes</h2>

            {isLoading && <Loader/>}
            {data && 
                <CustomerList customers={data.customers}
                    onPageChange={handlePageChange}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    totalProducts={data.total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />
            }
            
        </section>
    )
}

export default CustomersView