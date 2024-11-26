import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Category } from '@/types/index';
import { useNavigate } from 'react-router-dom';

type MenuCategoryProps = {
    category: Category
}

export default function MenuCategory({category} : MenuCategoryProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const navigate = useNavigate()
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                color='error'
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {category.name}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >   
                <MenuItem sx={{bgcolor: '#ff0000', ":hover":{ color: '#ff0000'}}}
                    onClick={() => {
                        handleClose()
                        navigate(`/collections/${category.name.replace(/ /g, '_')}/${category.id}`)
                    }}
                >
                    <h2 className='text-white uppercase hover:text-principal'>{category.name}</h2>
                </MenuItem>
                
                {category.subCategories.map(subCategory => (
                    
                    <MenuItem 
                        key={subCategory.id} 
                        onClick={ () => {
                            handleClose()
                            navigate(`/collections/${category.name.replace(/ /g, '-')}/${subCategory.name.replace(/ /g, '-')}/${subCategory.id}`)
                        }}
                    >
                        <h2 className='uppercase text-principal'>{subCategory.name}</h2>
                    </MenuItem>
                    
                ))}
            </Menu>
        </div>
    );
}


