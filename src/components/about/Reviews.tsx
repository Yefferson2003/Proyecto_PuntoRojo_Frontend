import { getReviewsVisibility } from "@/api/ReviewApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReviewsList from "./ReviewsList";
import Loader from "../Loader";

function Reviews() {

    const [page, setPage] = useState<number>(1);
    const [rowsPerPage] = useState<number>(10);

    const {data, isLoading} = useQuery({
        queryKey: ['reviewsVisibility', page, rowsPerPage],
        queryFn: () => getReviewsVisibility({page, limit: rowsPerPage})
    })
    
    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    return (
        <section className="w-full px-5 mt-10 space-y-6 text-center md:px-10">
        <div>
            <h2 className="text-2xl font-bold text-center capitalize text-principal md:text-start">Reseñas</h2>
        </div>

        {isLoading && <Loader/>}

        {data &&  <ReviewsList reviews={data?.reviews}
            count={data.totalPages}
            page={page}
            handlePageChange={handlePageChange}
        /> }

        
        
        </section>
    )
}

export default Reviews