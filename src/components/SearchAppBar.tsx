import SearchIcon from '@mui/icons-material/Search';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchAppBar() {

    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(e.target.value)
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (search.trim() === '') {
            navigate(`/search/productos`)
        } else {
            navigate(`/search/${search.replace(/ /g, '-')}`)
        }
    }
    
    return (
        <form onSubmit={handleOnSubmit} className='flex bg-white md:rounded-lg grow md:p-2 md:mx-2'>
            <TextField 
                value={search} 
                fullWidth  
                color='warning'
                onChange={handleOnChange}
                label="Buscar productos..."
                aria-label="Campo de búsqueda"
            />
            <IconButton type="submit" sx={{ p: '10px' }}
                id='button-search'
                aria-label="button-search"
            >
                <SearchIcon color='warning' />
            </IconButton>
        </form>
    );
}
