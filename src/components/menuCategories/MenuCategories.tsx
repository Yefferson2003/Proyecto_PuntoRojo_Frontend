import { Category } from "../../types"
import MenuCategory from "./MenuCategory"

type MenuCategoriesProps ={
    categories: Category[]
}

function MenuCategories({categories} : MenuCategoriesProps) {

    return (
        <section className="items-center hidden w-full h-12 bg-white tablet:flex justify-evenly">
            { categories.map(category => (
                <MenuCategory key={category.id} category={category}/>
            ))}
        </section>
    )
}

export default MenuCategories