import { getOrders } from "@/api/OrderApi";
import Loader from "@/components/Loader";
import OrderData from "@/components/orders/OrderData";
import OrderListTable from "@/components/orders/OrderListTable";
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import ErrorMessage from "@/components/ErrorMessage";

type searchType = {
    search?: string
    deliveryType?: string
    paymentMethod?: string
    startDate?: Dayjs | null;
    endDate?: Dayjs | null;
}

function OrderHistory() {

    const { register, handleSubmit, watch, setValue, reset } = useForm<searchType>();
    
    const { search, deliveryType, paymentMethod,  } = watch();

    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    
    // Páginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['orders', search, deliveryType, paymentMethod, startDate, endDate, page, rowsPerPage],
        queryFn: () => getOrders({ search, deliveryType, paymentMethod, startDate, endDate, status: 'completed', page: page + 1, limit: rowsPerPage }),
        
    });

    useEffect(() => {
        if (search || deliveryType || paymentMethod) {
            refetch();
        }
    }, [search, deliveryType, paymentMethod, refetch]);

    const validateStartDate = (date: Dayjs | null) => {
        if (date && !endDate) {
            return "Si eliges la fecha inicial, la fecha final también es obligatoria.";
        }
    };

    const validateEndDate = (date: Dayjs | null) => {
        if (date && !startDate) {
            return "Si eliges la fecha final, la fecha inicial también es obligatoria.";
        }
        if (date && startDate && dayjs(date).isBefore(startDate, 'day')) {
            return "La fecha final no puede ser anterior a la fecha inicial.";
        }
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const resetFilters = () => {
        reset();
        setStartDate(null);
        setEndDate(null);
        // refetch();
    }

    const onSubmit = handleSubmit(() => {
        refetch();
    });
    
    return (
        <section className="w-full">
            <h1 className="text-4xl font-bold text-center uppercase text-principal">Historial de Ordenes</h1>
            <p className="mt-3 text-lg">
                Aquí podras visualizar y buscar las ordenes
                <span className="font-bold text-principal"> Completadas </span> 
                por la identificación del cliente
            </p>

            <form
                className="grid grid-cols-2 gap-4 p-2 mt-3 bg-white rounded-lg gap-x-3"
                onSubmit={onSubmit}
                noValidate
            >
                
                <TextField
                    color="error"
                    label="Buscar"
                    variant="filled"
                    size="small"
                    fullWidth
                    id="search"
                    placeholder="Escribe tu búsqueda aquí..."
                    {...register("search")}
                />

                <div className="flex gap-3">

                <Button fullWidth
                    size="small" 
                    variant="outlined" 
                    color="error"
                    onClick={resetFilters}
                >
                    Reiniciar Filtros
                </Button>
                <Button fullWidth
                    type="submit" 
                    size="small" 
                    variant="contained" 
                    color="error" 
                    endIcon={<SearchIcon/>}
                >
                    Buscar
                </Button>
                </div>
                

                <FormControl fullWidth>
                    <InputLabel size="small" color="error" id="deliveryType">Tipo de entrega</InputLabel>
                    <Select
                        size="small"
                        labelId="deliveryType"
                        id="selectDeliveryType"
                        label="Tipo de entrega"
                        color="error"
                        defaultValue={''}
                        {...register("deliveryType")}
                    >
                        <MenuItem value={''} disabled>--Seleccione una opción--</MenuItem>
                        <MenuItem value={'delivery'}>Domicilio</MenuItem>
                        <MenuItem value={'pickup'}>Punto de recogida</MenuItem>
                    </Select>
                </FormControl>
                
                <FormControl fullWidth>
                    <InputLabel size="small" color="error" id="paymentMethod">Método de pago</InputLabel>
                    <Select
                        size="small"
                        labelId="paymentMethod"
                        id="selectPaymentMethod"
                        label="Método de pago"
                        color="error"
                        defaultValue={''}
                        {...register("paymentMethod")}
                    >
                        <MenuItem value={''} disabled>--Seleccione una opción--</MenuItem>
                        <MenuItem value={'counterDelivery'}>Contra entrega</MenuItem>
                        <MenuItem value={'credit'}>Crédito</MenuItem>
                    </Select>
                </FormControl>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth>
                <DatePicker
                    label="Fecha Inicial"
                    disableFuture
                    value={startDate}
                    onChange={(newValue) => {
                        setStartDate(newValue);
                        setValue("startDate", newValue, {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }}
                />
                { validateStartDate(startDate) && 
                    <ErrorMessage>{validateStartDate(startDate)}</ErrorMessage>
                }
                </FormControl>
                </LocalizationProvider>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth>
                <DatePicker
                    label="Fecha Final"
                    disableFuture
                    value={endDate}
                    onChange={(newValue) => {
                        setEndDate(newValue);
                        setValue("endDate", newValue, {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }}
                />
                { validateEndDate(endDate) && 
                    <ErrorMessage>{validateEndDate(endDate)}</ErrorMessage>
                }
                </FormControl>
                </LocalizationProvider>

            </form>

            <div className="mt-5 text-center">
                {isLoading && <Loader/>}
            </div>

            {data && 
                <OrderListTable rows={data.orders}
                    onPageChange={handlePageChange}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    totalOrders={data.total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    search={search}
                />
            }
            <OrderData/>
        </section>
    )
}

export default OrderHistory