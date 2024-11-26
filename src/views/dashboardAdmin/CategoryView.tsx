import { getCategories } from "@/api/CategoryApi"
import AddCategoryModal from "@/components/dashboardAdmin/categories/AddCategoryModal"
import CategoriesList from "@/components/dashboardAdmin/categories/CategoriesList"
import EditCategoryData from "@/components/dashboardAdmin/categories/EditCategoryData"
import AddSubCategoryModal from "@/components/dashboardAdmin/categories/subcategory/AddSubCategoryModal"
import EditSubCategoryData from "@/components/dashboardAdmin/categories/subcategory/EditSubCategoryData"
import Loader from "@/components/Loader"
import { Button } from "@mui/material"
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom"

function CategoryView() {

    const navigate = useNavigate()

    const {data, isLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })
    if (isLoading) return <div className="mt-20"><Loader/></div>
    if (data) return (
        <section className="">
            <h1 className="text-4xl font-bold text-center uppercase text-principal">Categorias y Subcategorias</h1>
            <p className="mt-3 text-lg">Aquí podras visualizar y administrar las <span className="font-bold text-principal">Categorias y Subcategorias</span>  presente en la plataforma</p>

            <Button sx={{marginY: '20px'}} 
                onClick={() => navigate(location.pathname + '?newCategory=true')}
                color="error" 
                variant="contained"
                id="button-add-category"
            >
                Agregar Categoria
            </Button>
            
            <h2 className="mb-5 text-3xl">Lista de Categorias</h2>
            {!data.length ? (
                <p className="font-bold text-center text-principal">No Hay Categorias Aun</p>
            ) : (
                <CategoriesList categories={data}/>
            )}
            
            <AddCategoryModal categories={data}/>
            <EditCategoryData/>
            <AddSubCategoryModal/>
            <EditSubCategoryData/>
        </section>
    )
}

export default CategoryView