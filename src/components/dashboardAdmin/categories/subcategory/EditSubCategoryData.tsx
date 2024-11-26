import { getSubcategoryById } from "@/api/SubCategoryApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import EditSubCategoryModal from "./EditSubCategoryModal";

function EditSubCategoryData() {

    const queryParams = new URLSearchParams(location.search);
    const modalSubCategory = queryParams.get('editSubCategory');
    const subCategoryId = Number(modalSubCategory)

    // OBTENER CATEGORY_ID
    const categoryId = Number(queryParams.get('categoryId'))!
    
    const {data, isError} = useQuery({
        queryKey: ['subCategory', subCategoryId],
        queryFn: () => getSubcategoryById({categoryId, subCategoryId}),
        enabled: !!subCategoryId
    })
    
    if (isError) return <Navigate to={'/404'}/>
    if (data) return <EditSubCategoryModal data={data} categoryId={categoryId}/>
}

export default EditSubCategoryData