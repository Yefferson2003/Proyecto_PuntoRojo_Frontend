import { getProductById } from "@/api/ProductApi"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import EditProductModal from "./EditProductModal"

type EditProductDataProps = {
    page: number
    rowsPerPage: number
    search: string
}

function EditProductData({page, rowsPerPage, search} : EditProductDataProps) {

    const queryParams = new URLSearchParams(location.search)
    const modalProduct = queryParams.get('editProduct')
    const productId = Number(modalProduct)
    
    const {data, isError} = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById({productId}),
        enabled: !!productId
    })
    
    if (isError) return <Navigate to={'/404'}/>
    if (data) return <EditProductModal 
        product={data} 
        productId={productId} 
        page={page} 
        rowsPerPage={rowsPerPage}
        search={search}
        />
}

export default EditProductData