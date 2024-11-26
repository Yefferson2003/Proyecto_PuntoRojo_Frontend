import { clientTypeTraslatios } from '@/locales/es.';
import { CustomerForAdmin } from '@/types/index';
import { formatDateTimeLarge } from '@/utils/index';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled, TablePagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import TableCellReview from './TableCellReview';

type CustomerListProps = {
    customers: CustomerForAdmin[]
    onPageChange: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
    totalProducts: number
    page: number
    rowsPerPage: number
}

function Row(props: { row: CustomerForAdmin }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row"
                sx={{width: 200, textTransform: 'capitalize'}}
            >
                {row.user.name}
            </TableCell>
            <TableCell>
                {row.identification}
            </TableCell>
            <TableCell>
                {row.clietType && 
                    clientTypeTraslatios[row.clietType]
                }
            </TableCell>
            <TableCell>
                {row.phone}
            </TableCell>
            <TableCell>
                {row.address}
            </TableCell>
            <TableCell>
                {row.createdAt && 
                    formatDateTimeLarge(row.createdAt)
                }
            </TableCell>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCellReview
                open={open}
                row={row}
            />
        </TableRow>
        </React.Fragment>
    );
}

const StyledTableCell = styled(TableCell)(() => ({
    color: "#FFFFFF", 
}));


export default function CustomerList({customers, handleChangeRowsPerPage, onPageChange, page, rowsPerPage, totalProducts}:CustomerListProps) {
    return (
        <React.Fragment>
        <TableContainer component={Paper}>
        <Table size='small' aria-label="collapsible table">
            <TableHead>
                <TableRow sx={{bgcolor: '#ff0000', color: 'with'}}>
                    <StyledTableCell>Nombre</StyledTableCell>
                    <StyledTableCell>Identificacion</StyledTableCell>
                    <StyledTableCell>Persona</StyledTableCell>
                    <StyledTableCell>Teléfono</StyledTableCell>
                    <StyledTableCell>Dirección</StyledTableCell>
                    <StyledTableCell>Fecha Creación</StyledTableCell>
                    <StyledTableCell>Reseña</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {customers.map((row) => (
                    <Row key={row.id} row={row} />
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
            sx={{background: '#ff0000', color: 'white', textAlign: 'center'}}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={ totalProducts || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </React.Fragment>
    );
}
