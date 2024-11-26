import useChangeOrde from '@/hooks/useChangeOrde';
import { Order } from '@/types/index';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import SelectDeliveryMan from './SelectDeliveryMan';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';


// Mapear estados a índices
const statusIndexMapDelivery : {[key: string] : number} = {
    pending: 0,
    packaging: 1,
    sending: 2,
};
const statusIndexMapPickup : {[key: string] : number} = {
    pending: 0,
    packaging: 1,
    ready: 2,
    completed: 3,
};

type ProgressStatusProps = {
    order: Order;
};

export default function ProgressStatus({ order }: ProgressStatusProps) {
    
    const [activeStep, setActiveStep] = React.useState<number>(order.deliveryType === 'delivery' ? statusIndexMapDelivery[order.status] :
    statusIndexMapPickup[order.status]  
    );
    const [skipped] = React.useState(new Set<number>());
    const navigate = useNavigate()

    const steps = order.deliveryType === 'delivery' ? 
        ['Pendiente', 'Empacando', 'Enviando'] :
        ['Pendiente', 'Empacando', 'Listo', 'Completado']

    const {mutate, isPending} = useChangeOrde()
    const queryClient = useQueryClient()

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNextDelivery = () => {
        // if (activeStep < steps.length - 1) {
        //     setActiveStep((prevStep) => prevStep + 1);
        // }
        switch (activeStep) {
            case 0:
                mutate(
                    {orderId: order.id, status: 'packaging'},
                    { onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ['order', order.id]})
                    }}
                )
                break;
            case 1:
                mutate(
                    {orderId: order.id, status: 'sending'},
                    { onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ['order', order.id]})
                    }}
                )
                break;
            case 2:
                break;
            default:
                break;
        }
    };
    const handleNextPickup = () => {
        // if (activeStep < steps.length - 1) {
        //     setActiveStep((prevStep) => prevStep + 1);
        // }
        switch (activeStep) {
            case 0:
                mutate(
                    {orderId: order.id, status: 'packaging'},
                    { onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ['order', order.id]})
                    }}
                )
                break;
            case 1:
                mutate(
                    {orderId: order.id, status: 'ready'},
                    { onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ['order', order.id]})
                    }}
                )
                break;
            case 2:
                mutate(
                    {orderId: order.id, status: 'completed'},
                    { onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ['order', order.id]})
                    }}
                )
                break;
            default:
                break;
        }
    };

    React.useEffect(() => {
        setActiveStep(order.deliveryType === 'delivery' ? statusIndexMapDelivery[order.status] : statusIndexMapPickup[order.status]);
    }, [order.status, order.deliveryType]);

    return (
        <Box sx={{ width: '100%' , mt: 1}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={isStepSkipped(index) ? false : undefined}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === ( steps.length-1) ? (
                <div className="flex justify-between mt-4">
                    {order.deliveryType === 'delivery' ? (
                        order.deliveryMan ? (
                            <div className="my-3 space-y-1 capitalize w-80">
                                <h2 className="text-xl text-principal">Datos del Repartidor</h2>
                                <p>Nombre: <span className="text-principal">{order.deliveryMan.user.name}</span></p>
                                <p>Teléfono: <span className="text-principal">{order.deliveryMan.phone}</span></p>
                                <p>Estado: <span className="normal-case text-principal">{order.deliveryMan.availability ? 'Disponible' : 'No Disponible'}</span></p>
                            </div>
                        ) : (
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                Listo para asignar un <span className="text-principal">Repartidor</span>
                            </Typography>
                        )
                    ) : (
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            El pedido ha sido completado y entregado
                        </Typography>
                    )}
                    
                    <SelectDeliveryMan orderId={order.id}  />
                </div>
            
            ) : (
                <React.Fragment>
                    <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'row', 
                            pt: 2, 
                            justifyContent: 'space-between'
                        }}>
                        <Button 
                            color='error' 
                            disabled={isPending}
                            variant={activeStep === 2 ? 'outlined' : 'contained'}
                            onClick={order.deliveryType === 'delivery' ? 
                                handleNextDelivery : 
                                handleNextPickup
                            }
                        >
                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente estado'}
                        </Button>
                        {activeStep === 2 && 
                            <Button color='error' variant='contained'
                                onClick={() => {
                                    mutate({orderId: order.id, status: 'return'})
                                    navigate(location.pathname, {replace: true})
                                }}
                            >
                                Devolución
                            </Button>
                        }
                        
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
