import { OrderFormData } from "@/types/index";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";

type PaymentProcessFormProps = {
    resgister: UseFormRegister<OrderFormData>
    errors: FieldErrors<OrderFormData>
    watch: UseFormWatch<OrderFormData>
    setValue: UseFormSetValue<OrderFormData>
}

function PaymentProcessForm({resgister, errors, watch, setValue} : PaymentProcessFormProps) {

    const [selectedPayment, setSelectedPayment] = useState("");

    const handlePaymentChange = ( e: SelectChangeEvent<string>) => {
        const paymentOption = e.target.value as string;
        setSelectedPayment(paymentOption);
    
        // Actualizar el valor predeterminado del campo request
        const paymentMessages: Record<string, string> = {
            efectivo: "Prefiero pagar en efectivo al recibir el pedido.",
            transferencia: "Enviaré la transferencia al finalizar la compra.",
            qr: "Escanearé el QR de Bancolombia para pagar.",
        };
    
        setValue("request", paymentMessages[paymentOption] || "");
    };
    
    const deliveryType = watch('deliveryType', 'delivery');
    
    return (
        <div className="space-y-4">

            {deliveryType === 'delivery' && (
                <div className="flex gap-2">
                    <WarningAmberIcon color="warning"/>
                    <p className="font-bold text-orange-500">Advertencia: Las compras inferiores a $50.000 se les cobrara el servicio domiciliario ( $3.000 ) </p>
                </div>
            )}
            
            
            <div className="space-y-3">
                <h2>Tipo de entrega</h2>
                <FormControl fullWidth>
                <Select
                    id="deliveryType"
                    color="error"
                    defaultValue={deliveryType}
                    {...resgister('deliveryType')}
                    
                >
                    <MenuItem id="delivery" value={'delivery'}>Domicilio</MenuItem>
                    <MenuItem id="pickup" value={'pickup'}>Punto de recogida</MenuItem>
                </Select>
                </FormControl>
            </div>
            
            {deliveryType === 'delivery' ?  (
                <div className="space-y-3">
                    <h2>
                        Dirección
                    </h2>
                    <FormControl fullWidth>
                        <TextField 
                            id="address" 
                            variant="outlined"
                            placeholder='Ej: Calle 45 # 23-15, Apartamento 301, Barrio Chapinero'
                            {...resgister("address", {
                                required: "La dirección es obligatoria.",
                                maxLength: { value: 200, message: "La dirección no puede exceder los 200 caracteres." },
                            })}
                        />
                        {errors.address && (
                            <ErrorMessage>{errors.address.message}</ErrorMessage>
                        )}
                    </FormControl>
                </div>
            ) : (
                <div className="space-y-3">
                    <h2>Dirección del punto de recogida</h2>
                    <p className="px-5 text-principal">Calle 5 #18-68</p>
                </div>
            )}


            <div className="space-y-3">
                <h2>Método de pago</h2>
                <FormControl fullWidth>
                <Select
                    id="paymentMethod"
                    color="error"
                    defaultValue="counterDelivery"
                    {...resgister('paymentMethod')}
                >
                    <MenuItem value={'counterDelivery'}>Contra entrega</MenuItem>
                    <MenuItem value={'credit'}>Crédito</MenuItem>
                </Select>
                </FormControl>
            </div>

            <div className="w-full space-y-3">
                <h2>Medios de pagos aceptados:</h2>
                <ul>
                    <li className="flex gap-4">
                        <div className="">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNkYzI2MjYiIGQ9Ik0xMyAxNGgxdjFoLTF6bTEgMWgxdjFoLTF6bTAgMWgxdjFoLTF6bTIgMGgxdjFoLTF6bTAgMWgxdjFoLTF6bS0zLTFoMXYxaC0xem0yIDBoMXYxaC0xem0wIDFoMXYxaC0xem0zLTFoMXYxaC0xem0wLTFoMXYxaC0xem0xLTFoMXYxaC0xem0tMiAyaDF2MWgtMXptMCAxaDF2MWgtMXptLTEgMWgxdjFoLTF6bS0xIDBoMXYxaC0xem0yIDBoMXYxaC0xem0xIDBoMXYxaC0xem0tMiAxaDF2MWgtMXptLTIgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bS0yIDBoMXYxaC0xem0wIDFoMXYxaC0xem0xIDFoMXYxaC0xem0xIDBoMXYxaC0xem0yIDBoMXYxaC0xem0xIDBoMXYxaC0xem0tMS0yaDF2MWgtMXptMSAwaDF2MWgtMXptMS0xaDF2MWgtMXptMC0xaDF2MWgtMXptMCAzaDF2MWgtMXptMC0xaDF2MWgtMXptMS0xaDF2MWgtMXptMC0xaDF2MWgtMXptMSAzaDF2MWgtMXptMC0yaDF2MWgtMXptMCAxaDF2MWgtMXptLTItM2gxdjFoLTF6bS02IDFoMXYxaC0xem0tMSAwaDF2MWgtMXptMCAxaDF2MWgtMXptMiAwaDF2MWgtMXptLTMgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bS0yIDFoMXYxaC0xem0wIDFoMXYxaC0xem0wLTE5aDF2MWgtMXptMSAxaDF2MWgtMXptLTEgMmgxdjFoLTF6bTEgMWgxdjFoLTF6bS0xIDFoMXYxaC0xem0xIDBoMXYxaC0xem0wIDFoMXYxaC0xem0wIDFoMXYxaC0xem0tMSAxaDF2MWgtMXptMSAwaDF2MWgtMXptLTEgMWgxdjFoLTF6TTEgMTFoMXYxSDF6bTEgMWgxdjFIMnptMi0xaDF2MUg0em0wIDFoMXYxSDR6bTEtMWgxdjFINXptMSAxaDF2MUg2em0xLTFoMXYxSDd6bTEgMWgxdjFIOHptMC0xaDF2MUg4em0xIDBoMXYxSDl6bTEgMGgxdjFoLTF6bTEgMWgxdjFoLTF6bTIgMGgxdjFoLTF6bTEtMWgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bS0xIDJoMXYxaC0xem0tMiA5aDF2MWgtMXptLTEgMGgxdjFoLTF6bTAtOWgxdjFoLTF6bS0xIDBoMXYxaC0xem0wIDFoMXYxaC0xem0wIDFoMXYxaC0xem0xMS0xaDF2MWgtMXptLTEgMWgxdjFoLTF6bTEgMmgxdjFoLTF6bS01LTRoMXYxaC0xem0xLTFoMXYxaC0xem00IDBoMXYxaC0xem0wIDFoMXYxaC0xem0tMSAwaDF2MWgtMXptMSA4aDF2MWgtMXptLTEgMWgxdjFoLTF6bS0yIDBoMXYxaC0xem0zIDBoMXYxaC0xeiIvPjxwYXRoIHN0cm9rZT0iI2RjMjYyNiIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTUgMmg3djdoLTd6TTIgMmg3djdIMnptMCAxM2g3djdIMnpNMTggNWgxdjFoLTF6TTUgNWgxdjFINXptMCAxM2gxdjFINXoiLz48L2c+PC9zdmc+" alt="Qr Icon" />
                            
                        </div>
                        <h3>QR de Bancolombia</h3>
                    </li>
                    <li className="flex gap-4">
                        <div>
                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBmaWxsPSIjZGMyNjI2IiBkPSJNMTYgMTRIMnYtMWgxM1Y2aDF6Ii8+PHBhdGggZmlsbD0iI2RjMjYyNiIgZD0iTTEzIDR2N0gxVjR6bTEtMUgwdjloMTR6Ii8+PHBhdGggZmlsbD0iI2RjMjYyNiIgZD0iTTMgNkgydjNoMXYxaDRhMi41IDIuNSAwIDEgMSAwLTVIM3ptOCAwVjVIN2EyLjUgMi41IDAgMSAxIDAgNWg0VjloMVY2eiIvPjwvc3ZnPg==" alt="efectivo" />
                        </div>
                        <h3>Efectivo</h3>
                    </li>
                </ul>
                <FormControl fullWidth color="error">
                <InputLabel id="demo-simple-select-label-2">Seleccione un medio de pago</InputLabel>
                <Select
                    labelId="demo-simple-select-label-2"
                    id="demo-simple-select"
                    label="Seleccione un medio de pago"
                    value={selectedPayment}
                    onChange={handlePaymentChange}
                >
                    <MenuItem value="efectivo">Efectivo</MenuItem>
                    <MenuItem value="transferencia">Transferencia</MenuItem>
                    <MenuItem value="qr">QR de Bancolombia</MenuItem>
                </Select>
                </FormControl>
            </div>

            <div className="space-y-3">
                <h2>Petición o sugerencia de empacado <span className="text-principal">( Opcional )</span></h2>
                <FormControl fullWidth>
                <TextField
                    id="request"
                    multiline
                    maxRows={4}
                    color="error"
                    {...resgister('request')}
                />
                </FormControl>
            </div>
        </div>
    )
}

export default PaymentProcessForm