import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Order } from "@/types/index";

type OrderDataCustomerModalProps = {
    order: Order
}

function OrderDataCustomerModal({order} : OrderDataCustomerModalProps) {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Datos del cliente : <span className="text-principal"> {order.customer.user.name}</span>
                </AccordionSummary>
                <AccordionDetails>
                <section className="flex justify-between gap-3">
                    <div>
                        <h2 className="text-xl text-principal">Petición</h2>
                        <p>{order.request ? (order.request) : ('No hay petición del usuario') }</p>
                    </div>
                    <div className="my-3 space-y-1 capitalize w-80">
                        <h2 className="text-xl text-principal">Datos del Cliente</h2>
                        <p>Nombre: <span className=" text-principal">{order.customer.user.name}</span></p>
                        <p>Télefono: <span className="text-principal">{order.customer.phone}</span></p>
                        <p>{order.customer.clietType === 'natural' ? 'C.C.:' : 'Nit:' }<span className=" text-principal">{order.customer.identification}</span></p>
                        <p>Correo: <span className="normal-case text-principal">{order.customer.user.email}</span></p>
                        <p>Dirección: <span className="text-principal">{order.address}</span></p>
                    </div>
                </section>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default OrderDataCustomerModal