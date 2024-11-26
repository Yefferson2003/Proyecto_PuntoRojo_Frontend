import { getDeliveryManById } from "@/api/DeliveryManApi"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import ViewOrderOfDeliveryModal from "./ViewOrderOfDeliveryModal"
import { useState } from "react"

function ViewOrderOfDeliveryData() {

    const queryParams = new URLSearchParams(location.search)
    const modalDelivery = queryParams.get('viewDelivery')
    const deliveryManId = Number(modalDelivery)

    // Páginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const params = {page: page +1, limit : rowsPerPage}

    const {data, isError} = useQuery({
        queryKey: ['deliveryMan', deliveryManId, page, rowsPerPage],
        queryFn: () => getDeliveryManById({deliveryManId, params}),
        enabled: !!deliveryManId
    })

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handlePageChange = (event: unknown, newPage: number) => {
        console.log(event);
        
        setPage(newPage)
    }

    if (isError) return <Navigate to={'/404'}/>
    if (data) return <ViewOrderOfDeliveryModal orders={data.orders}
        onPageChange={handlePageChange}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        totalOrders={data.total}
        page={page}
        rowsPerPage={rowsPerPage}
    /> 

}

export default ViewOrderOfDeliveryData