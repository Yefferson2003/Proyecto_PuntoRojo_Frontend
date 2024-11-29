import ClassIcon from '@mui/icons-material/Class'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useState } from "react"

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Category } from "../../types"
import { useNavigate } from 'react-router-dom'

type SidebarCategoriesProps ={
    categories: Category[]
}

function SidebarCategories({categories} : SidebarCategoriesProps) {

    // Estado que maneja la apertura de cada categoría
    const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({});
    const navigate = useNavigate()

    // Función para alternar el estado de apertura de una categoría específica
    const handleClickCategory = (categoryId: number) => {
        setOpenCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId], // Invertir el estado de apertura de la categoría seleccionada
        }));
    };

    const handleNavigate = (path: string, categoryId: number ) => {
        handleClickCategory(categoryId); 
        setTimeout(() => {
            navigate(path)
        }, 1000);
    };

    
    return (
    <List sx={{background: '#cbd5e1'}}>
        {categories.map(category => (
            <div key={category.id}>
            <ListItemButton  onClick={() => handleClickCategory(category.id)}>
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <ListItemText sx={{textTransform: 'capitalize '}}  primary={category.name} />
                {openCategories[category.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openCategories[category.id]} timeout="auto" unmountOnExit>
                <List sx={{background: 'white'}} component="div" disablePadding>
                    <ListItemButton
                        onClick={() => navigate(`/collections/${category.name.replace(/ /g, '_')}/${category.id}`)}
                    >
                        <ListItemText sx={{textTransform: 'capitalize '}} primary={category.name} />
                    </ListItemButton>
                    {category.subCategories.map(subCategory => (
                        <ListItemButton 
                            key={subCategory.id} 
                            sx={{ pl: 4 }}
                            onClick={() => 
                                handleNavigate(`/collections/${category.name.replace(/ /g, '-')}/${subCategory.name.replace(/ /g, '-')}/${subCategory.id}`, category.id)
                            }
                        >
                            <ListItemText sx={{textTransform: 'capitalize '}} primary={subCategory.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse> 

            </div>  
        ))}
    </List>  
    )
}

export default SidebarCategories