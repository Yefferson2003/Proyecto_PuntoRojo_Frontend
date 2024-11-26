import { StateCreator } from "zustand";
import { Message } from "../types";

export type MessageStoreType = {
    messages: Message[]
    addMessage: (message: string) => void
    changeVisibilityMessage: (params: { messageId: number }) => void;
    updateMessage: (params: { messageId: number, message: string }) => void;
    deleteMessage: (params: { messageId: number }) => void;
    getVisibleMessages: () => Message[];
}

export const createMessageSlice : StateCreator<MessageStoreType> = (set, get) => ({
    messages: [],
    addMessage: (message : string) => set((state) => ({
        messages: [...state.messages, {message, id: Date.now(), visibility: false}]
    })),
    updateMessage: ({ messageId, message }: { messageId: number, message: string})=> set((state) => ({
        messages: state.messages.map(mess => 
            mess.id === messageId
            ? {...mess, message}
            : mess
        )
    })),
    changeVisibilityMessage: ({ messageId }: { messageId: number })=> set((state) => ({
        messages: state.messages.map(message => 
            message.id === messageId 
            ? { ...message, visibility: !message.visibility }
            : message
        )
    })),
    deleteMessage:({ messageId }: { messageId: number })=> set((state) => ({
        messages: state.messages.filter(message => message.id !== messageId)
    })),
    getVisibleMessages: () => {
        return get().messages.filter((message) => message.visibility === true)
    }

})
