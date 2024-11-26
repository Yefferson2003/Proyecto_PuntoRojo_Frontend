import { getProduts } from "@/api/ProductApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ListProductsFilters from "./ListProductsFilters";

function ProductsOffer() {

    const [page, setPage] = useState<number>(1);
    const [rowsPerPage] = useState<number>(10);

    const {data, refetch} = useQuery({
        queryKey: ['productOffer', page, rowsPerPage],
        queryFn: () => getProduts({offer: true, page, limit: rowsPerPage})
    })

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
        refetch()
    };
    return (
        <section className="w-full px-5 mt-10 space-y-6 md:px-10">
            <div>
                <h2 className="text-2xl font-bold text-center capitalize text-principal md:text-start">Productos en Oferta</h2>
            </div>

            {data && 
                <ListProductsFilters 
                    productsByOffer={data.products}
                    count={data.totalPages}
                    page={page}
                    handlePageChange={handlePageChange}
                />
            }
        
        </section>
    )
}

export default ProductsOffer