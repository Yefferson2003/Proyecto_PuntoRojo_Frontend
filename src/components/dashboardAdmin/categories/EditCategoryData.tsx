import { getCategoryById } from "@/api/CategoryApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import EditCategoryModal from "./EditCategoryModal";

function EditCategoryData() {

    const queryParams = new URLSearchParams(location.search);
    const modalCategory = queryParams.get('editCategory');
    const categoryId = Number(modalCategory)
    
    const {data, isError} = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => getCategoryById({categoryId}),
        enabled: !!categoryId
    })
    
    if (isError) return <Navigate to={'/404'}/>
    if (data) return <EditCategoryModal data={data} categoryId={categoryId} />
}

export default EditCategoryData