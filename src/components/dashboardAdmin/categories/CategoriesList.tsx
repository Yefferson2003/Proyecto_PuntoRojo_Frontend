import { Category } from '@/types/index';
import { Button, Divider, styled, TablePagination, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as React from 'react';
// Iconos
import ClassIcon from '@mui/icons-material/Class';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeVisibilityCategory } from '@/api/CategoryApi';
import { toast } from 'react-toastify';
import { changeVisibilitySubCategory } from '@/api/SubCategoryApi';


type CategoriesListProps = {
    categories: Category[]
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ff0000',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#cbd5e1',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function Row(props: { category: Category}) {
    const {category} = props

    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);

    const queryClient = useQueryClient()
    const {mutate : changeVisibilityForCategory} = useMutation({
        mutationFn: changeVisibilityCategory,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data, {categoryId}) {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['categories']})
            queryClient.invalidateQueries({queryKey: ['category', categoryId]})
        },
    })  
    
    const {mutate : changeVisibilityForSubCategory } = useMutation({
        mutationFn: changeVisibilitySubCategory,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data, {subCategoryId}) {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['categories']})
            queryClient.invalidateQueries({queryKey: ['subCategory', subCategoryId]})
        },
    })  

    return (
        <React.Fragment>
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton
                    id={`expand-row-${category.id}`}
                    aria-label="expand row"
                    size="small"
                    onClick={() =>setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                <p className='uppercase'>{category.name}</p>
            </TableCell>
            <TableCell align="center">
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => navigate(location.pathname + `?editCategory=${category.id}`)}
                >
                    <Tooltip title='Editar'><EditIcon/></Tooltip>
                </IconButton>
            </TableCell>
            <TableCell align="center">
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => changeVisibilityForCategory({categoryId: category.id})}
                >
                    {category.visibility ? 
                        <Tooltip title='Esta Visible'><VisibilityIcon color='info'/></Tooltip> : 
                        <Tooltip title='No Esta Visible'><VisibilityOffIcon color='error'/></Tooltip>
                    }
                </IconButton>
            </TableCell>
        </StyledTableRow>
        <StyledTableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Subcategorias de <span className='text-principal'>{category.name}</span> 
                </Typography>
                <div className='my-5'>
                    <Button color='error' variant='outlined'
                        id={`button-add-subcategory-${category.id}`}
                        onClick={() => navigate(location.pathname + `?categoryId=${category.id}&newSubCategory=true`)}
                    >
                        Agregar Subcategoria
                    </Button>
                </div>
                
                {category.subCategories.length <= 0? (
                    <p className='mb-8 font-bold text-center text-principal'>No hay Subactegorias aun</p>
                ):(
                    <>
                    <Divider/>
                    <Table size="small" aria-label="purchases">
                    <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Nombre de la Subcategoria</StyledTableCell>
                        <StyledTableCell>Editar</StyledTableCell>
                        <StyledTableCell>Visibilidad</StyledTableCell>
                    </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {category.subCategories.map(subCategory => (
                            <TableRow key={subCategory.id} >
                                <TableCell component="th" scope="row">
                                    <p className='uppercase '>{subCategory.name}</p>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => navigate(location.pathname + `?categoryId=${category.id}&editSubCategory=${subCategory.id}`)}
                                    >
                                        <Tooltip title='Editar Categoria'><EditIcon/></Tooltip>
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => changeVisibilityForSubCategory({categoryId: category.id, subCategoryId: subCategory.id})}
                                    >
                                        {subCategory.visibility ? 
                                            <Tooltip title='Esta Visible'><VisibilityIcon color='info'/></Tooltip>: 
                                            <Tooltip title='No Esta Visible'><VisibilityOffIcon color='error'/></Tooltip>
                                        }
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                    </>
                )}

                </Box>
            </Collapse>
            </TableCell>
        </StyledTableRow>
        </React.Fragment>
    );
}

export default function CategoriesList({categories}: CategoriesListProps) {
    // PAGINACIÓN
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event);
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = React.useMemo(
        () => page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0,
        [page, rowsPerPage, categories]
    );
    const visibleRows = React.useMemo(
    () =>
        [...categories]
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, categories],
    );
        
    return (
        <>
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size='small'>
            <TableHead>
                <StyledTableRow
                    
                >
                    <StyledTableCell><ClassIcon/> Subcategorias</StyledTableCell>
                    <StyledTableCell>Nombre de la Categoria</StyledTableCell>
                    <StyledTableCell align="center">Editar</StyledTableCell>
                    <StyledTableCell align="center">Visibilidad</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {visibleRows.map(category => (
                    <Row key={category.id} category={category} />
                ))}
                {emptyRows > 0 && (
                    <TableRow
                    >
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
            </TableBody>
        </Table>
        </TableContainer>
        {/* PAGINACIÓN */}
        <TablePagination
            sx={{background: '#ff0000', color: 'white', textAlign: 'center'}}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </>
    );
}
