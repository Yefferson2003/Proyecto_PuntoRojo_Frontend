import AddMessageModal from "@/components/dashboardAdmin/messages/AddMessageModal"
import EditMessageData from "@/components/dashboardAdmin/messages/EditMessageData"
import MessagesList from "@/components/dashboardAdmin/messages/MessagesList"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

function MessageView() {

    const navigate = useNavigate()
    
    return (
        <section className="w-full">
            <h1 className="text-4xl font-bold text-center uppercase text-principal">Avisos</h1>
            <p className="mt-3 text-lg">Aquí podrás visualizar, crear y administrar los <span className="font-bold text-principal">Avisos </span> o mensajes globales para los clientes en la página principal</p>

            <Button
                id="button-add-message"
                sx={{ marginTop: '20px' }}
                onClick={() => navigate(location.pathname + '?newMessage=true')}
                color="error"
                variant="contained"
            >
                Agregar Mensaje
            </Button>
            
            <MessagesList/>

            <AddMessageModal/>
            <EditMessageData/>
        </section>
    )
}

export default MessageView