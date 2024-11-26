import { getProduts } from "@/api/ProductApi";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import ListProductsFilters from "@/components/products/ListProductsFilters";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

function ProductsSearchView() {

    const {search} = useParams()
    const navigate = useNavigate()

    const [page, setPage] = useState<number>(1);
    const [rowsPerPage] = useState<number>(25);

    const {data, isError, refetch} = useQuery({
        queryKey: [search, page, rowsPerPage],
        queryFn: search !== 'productos' ? 
            () => getProduts({search, availability: 'true', page, limit: rowsPerPage}) :
            () => getProduts({ availability: 'true', page, limit: rowsPerPage}),
        enabled: !!search
    })

    const handlePageChange = (event: unknown, newPage: number) => {
        console.log(event);
        setPage(newPage);
    };

    useEffect(() => {
        if (search) {
            refetch();
        }
    }, [search, refetch]);
    
    if (isError) <Navigate to={'/404'}/>
    if (data) return (
        <section className="w-full px-10 tablet2:my-10">
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

                {!data.products.length ? (
                    <Typography
                    sx={{ color: '#ff0000', display: 'flex', alignItems: 'center' }}
                    >
                        No hay Resultados para "{search?.replace(/ /g, ' ')}"
                    </Typography>
                ):(
                    <Typography
                    sx={{ color: '#ff0000', display: 'flex', alignItems: 'center', textTransform: 'uppercase' }}
                    >
                        <SearchIcon sx={{ mr: 0.5 }} fontSize="inherit" color='error'/>
                        {search && search.replace(/ /g, ' ')}
                    </Typography>
                )}

            </Breadcrumbs>
            
            

            {!data.products.length ? (
                <div className="my-10 space-y-4 text-center ">
                    <h2 className="text-xl md:text-2xl">No hay resultados con
                    <span className="uppercase text-principal"> "{search?.replace(/ /g, ' ')}"</span></h2>
                    <Button variant="contained" color="error" endIcon={<HomeIcon/>}
                        onClick={() => navigate('/') }
                    >
                        Volver al Inicio
                    </Button>
                </div>
            ) : (
                <div className="my-10">
                    <ListProductsFilters 
                        productsBySearch={data.products}
                        count={data.totalPages}
                        handlePageChange={handlePageChange}
                        page={page}
                    />
                </div>
            )}
        </section>
        
    )
}

export default ProductsSearchView