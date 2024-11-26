import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import EditMessageModal from "./EditMessageModal"
import { getMessageById } from "@/api/MessageApi"

function EditMessageData() {
    const queryParams = new URLSearchParams(location.search)
    const modalMessage = queryParams.get('editMessage')
    const messageId = Number(modalMessage)

    const {data, isError} = useQuery({
        queryKey: ['message', messageId],
        queryFn: () => getMessageById({messageId}),
        enabled: !!messageId
    })

    if (isError) return <Navigate to={'/404'}/>
    if (data) return <EditMessageModal data={data}/>
}

export default EditMessageData