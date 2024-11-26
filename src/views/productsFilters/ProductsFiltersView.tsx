import { getProduts } from "@/api/ProductApi";
import ListProductsFilters from "@/components/products/ListProductsFilters";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

import Loader from "@/components/Loader";
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from "react";

function ProductsFilters() {

    const {categoryId, subCategoryId, category, subCategory } = useParams<{ 
        subCategoryId: string, 
        categoryId: string,
        category: string,
        subCategory: string
    }>();

    const [page, setPage] = useState<number>(1);
    const [rowsPerPage] = useState<number>(25);

    const {data: productsBySubCategories, isError: errorSubCategory, isLoading: isLoadingSub, refetch: refetchSub} = useQuery({
        queryKey: ['productsFilters', subCategoryId, page, rowsPerPage],
        queryFn: () => getProduts({subcategory: subCategoryId, availability: 'true', page, limit: rowsPerPage}),
        enabled: !!subCategoryId 
    })

    const {data: productsByCategories, isError: errorCategory, isLoading: isLoadingCat, refetch: refetchCat} = useQuery({
        queryKey: ['productsFilters', categoryId, page, rowsPerPage],
        queryFn: () => getProduts({category: categoryId, availability: 'true', page, limit: rowsPerPage}),
        enabled: !!categoryId 
    })

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);

        refetchCat?.();
        refetchSub?.();
    };
    
    
    if (errorCategory || errorSubCategory) return <Navigate to={'/404'}/>
    return (
        <section className="px-10 space-y-4">
            
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

                <Typography
                sx={{ color: '#ff0000', display: 'flex', alignItems: 'center' }}
                >
                    <ChecklistIcon sx={{ mr: 0.5 }} fontSize="inherit" color='error'/>
                    {subCategory ? (
                        subCategory
                    ):(
                        category
                    )}
                </Typography>
            </Breadcrumbs>

            <div className="space-y-4">
            <h2 className="text-3xl uppercase text-principal">
                {subCategory ? (
                    subCategory
                ):(
                    category
                )}
            </h2>
            <p className="text-justify ">
                Encuentra en Autoservicio Éxito - Punto Rojo los mejores y más frescos productos para ti y tu familia. Ofrecemos una gran variedad de alimentos y artículos de primera necesidad, con la mejor calidad y al mejor precio para que disfrutes de tus compras al máximo.
            </p>
            </div>
            
            <div className="text-center">{(isLoadingCat || isLoadingSub) && <Loader/>}</div>
            {(productsBySubCategories || productsByCategories) && 
                <ListProductsFilters
                    productsBySub={productsBySubCategories?.products}
                    productsByCat={productsByCategories?.products}
                    count={productsBySubCategories?.totalPages || productsByCategories?.totalPages}
                    handlePageChange={handlePageChange}
                    page={page}
                />
            }

        </section>
    )
}

export default ProductsFilters