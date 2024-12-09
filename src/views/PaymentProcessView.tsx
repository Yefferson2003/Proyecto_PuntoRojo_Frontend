import { createOrder } from "@/api/OrderApi";
import PaymentProcessForm from "@/components/paymentProcess/PaymentProcessForm";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Badge, Button, Divider } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRootStore } from "../stores/rootStore";
import { customerSchema, OrderFormData, productsFormData } from "../types";
import { formatCurrencyCOP } from "../utils";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

function PaymentProcessView() {

    const navigate = useNavigate()
    const {data} = useAuth()
    const cart = useRootStore((state => state.cart))
    const clearCart = useRootStore((state => state.clearCart))
    
    const subtotal = cart.reduce((sum, item) => sum + +item.product.priceAfter * item.quantity, 0);

    const [initialValues, setInitialValues] = useState<OrderFormData | null>(null);

    useEffect(() => {
        const result = customerSchema.safeParse(data);
        const address = result.success && result.data.address ? result.data.address : '';

        setInitialValues({
            deliveryType: 'delivery',
            paymentMethod: 'counterDelivery',
            request: '',
            address,
            products: []
        });
    }, [data]);
    
    const {register, handleSubmit, watch, reset, setValue, formState: { errors }} = useForm({defaultValues: initialValues || {}})

    useEffect(() => {
        if (initialValues) {
            reset(initialValues)
        }
    }, [initialValues, reset])
    
    const deliveryType = watch('deliveryType', 'delivery');
    const cobrarDelivery : boolean = (deliveryType === 'delivery' && subtotal <= 50000) 

    const {mutate, isPending} = useMutation({
        mutationFn: createOrder,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            navigate('/')
            toast.success(data)
            clearCart()
        }
    })
    
    const handleCretaeOrder = (formData : OrderFormData) => {

        const token = localStorage.getItem('AUTH_TOKEN')

        if (!token) {
            toast.warning('Necesitas Iniciar Sesión...')
        } else {
            const products : productsFormData[] = cart.map(item => ({
                productId: item.product.id, 
                quantity: item.quantity
            }));
    
            const updateFormData ={
                ...formData,
                products
            }
    
            mutate({formData: updateFormData})
        }
    }

    return (
        <div className="w-full">

            <section>
            <Accordion disabled={cart.length == 0}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                    <div className="flex justify-between w-full px-4">
                        <p>Resumen del pedido</p>
                        <p className="text-principal">
                            {
                                cobrarDelivery ? formatCurrencyCOP(subtotal + 3000) : formatCurrencyCOP(subtotal )
                            }
                        </p>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider sx={{mb: '10px'}}/>
                    {cart.map(item => (
                        <div key={item.product.id} className="flex gap-4 mb-1 ">
                            <div className="w-[50px] p-1 flex-none border-2">
                                <Badge badgeContent={item.quantity} color="error">
                                <img src={item.product.imgUrl} alt={item.product.name} />
                                </Badge>
                            </div>
                            <div className="flex-1">
                                
                                <p className="capitalize text-wrap">{item.product.name}</p>  
                                
                            </div>
                            <div className="flex-none">
                                <p>{formatCurrencyCOP(+item.product.priceAfter * item.quantity)}</p>
                            </div>
                        </div>
                    ))}
                    {
                        deliveryType === 'delivery' && (
                            <div className="flex justify-between gap-4 mb-1 font-bold text-principal">
                                <div className="flex 1">
                                    <p className="">Servicio Domiciliario</p>
                                </div>
                                
                                <div className="flex-none">
                                    <p>{formatCurrencyCOP(cobrarDelivery ? 3000 : 0)}</p>
                                </div>
                            </div>
                        )
                    }
                </AccordionDetails>
            </Accordion>
            </section>

            <section className="px-3 py-3 mt-5 space-y-4 bg-white md:px-10">
                <h2 className="text-xl font-bold">Formulario del pedido</h2>
                
                <form onSubmit={handleSubmit(handleCretaeOrder)} className="space-y-4">
                    <PaymentProcessForm 
                        resgister={register} 
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                    />
                    <Button fullWidth type="submit" variant="contained" color="error"
                        disabled={cart.length == 0 || isPending}
                        id="button-pay-process"
                    >
                        Enviar Pedido
                    </Button>
                </form>

            </section>
        </div>
    )
}

export default PaymentProcessView