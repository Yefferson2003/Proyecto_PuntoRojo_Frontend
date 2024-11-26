import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { FormMessage, Message, messageSchema, messagesSchema } from "../types";

type MessageApi = {
    messageId: Message['id']
    formData: FormMessage
}

export async function getMessages(params = {}) {
    try {
        const {data} = await api.get('/messages', {params})
        const response = messagesSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getMessageById({messageId} : Pick<MessageApi, 'messageId'>) {
    try {
        const {data} = await api.get(`/messages/${messageId}`)
        const response = messageSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createMessage({formData} : Pick<MessageApi, 'formData'>) {
    try {
        const {data} = await api.post<string>(`/messages`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateMessage({formData, messageId} : Pick<MessageApi, 'formData' | 'messageId'>) {
    try {
        const {data} = await api.patch<string>(`/messages/${messageId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function changeVisibilityMessage( {messageId} : Pick<MessageApi, 'messageId'>) {
    try {
        const {data} = await api.patch<string>(`/messages/${messageId}/visibility`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteMessage( {messageId} : Pick<MessageApi, 'messageId'>) {
    try {
        const {data} = await api.delete<string>(`/messages/${messageId}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}