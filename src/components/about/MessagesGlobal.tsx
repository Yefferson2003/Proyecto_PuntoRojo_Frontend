import { getMessages } from "@/api/MessageApi"
import { useQuery } from "@tanstack/react-query"
import Loader from "../Loader"

function MessagesGlobal() {

    const {data, isLoading} = useQuery({
        queryKey: ['visibleMessages'],
        queryFn: () => getMessages({visibility: 'true'})
    })
    
    return (
        <section 
            className="w-full p-1 mt-5 font-bold text-center capitalize bg-white md:mt-14 text-wrap"
        >
            {isLoading && <Loader/>}
            {data && data.map(message => (
                <p key={message.id}>{message.message}</p>
            ))}
        </section>
    )
}

export default MessagesGlobal