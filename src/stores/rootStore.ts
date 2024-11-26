import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CartStoreType, createCartSlice } from "./cartSlice";
import type {} from '@redux-devtools/extension'; 
import { createMessageSlice, MessageStoreType } from "./messageSlice";

// Crear el store combinando slices y agregando persistencia
export const useRootStore = create<CartStoreType & MessageStoreType>()(
    devtools(
        persist(
        (...a) => ({
            ...createCartSlice(...a), // Agregamos el slice del carrito
            ...createMessageSlice(...a)
            // Aquí podrías agregar otros slices en el futuro
        }),
        {
            name: 'root-storage'
        }
        )
    )
);

