
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { MouseEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';

function AccountIconAdmin() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate()
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']});
        setAnchorEl(null)
        navigate('/auth/login')
    };

    return (
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <div>
                <IconButton size="large" color="inherit" onClick={handleClick}>
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
                </Menu>
            </div>
        </Box>
    );
}

export default AccountIconAdmin;
