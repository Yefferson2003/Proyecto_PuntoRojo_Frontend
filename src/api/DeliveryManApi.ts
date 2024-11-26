import { isAxiosError } from "axios"
import { DeliveryMan, DeliveryManRegistrationForm, DeliveryManUpdateForm, deliveryMenSchema, orderDetailsForCustomerSchema, responseOrdersDeliverySchemaForAdmin, responseOrdersForDeliverySchema } from "../types"
import api from "@/lib/axios"

type DeliveryManApi = {
    formData: DeliveryManRegistrationForm
    deliveryManId: DeliveryMan['id']
    params: {
        overToday?: string
        page: number;
        limit: number;
    }
}

export const getDeliveryMen = async (params = {}) => {
    try {
        const url = `/deliveryMan`
        const {data} = await api.get(url, {params})
        const response = deliveryMenSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export const getDeliveryManById = async ({deliveryManId, params = { page: 0, limit: 10}} : Pick<DeliveryManApi, 'deliveryManId' | 'params'>) => {
    try {
        const url = `/deliveryMan/${deliveryManId}/orders`
        const {data} = await api.get(url, {params})
        const response = responseOrdersDeliverySchemaForAdmin.safeParse(data)
        console.log(response.error);
        console.log(data);
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export const createAccountDeliveryMan= async ({formData} : Pick<DeliveryManApi, 'formData'>) => {
    try {
        const url = `/deliveryMan`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export const updateDeliveryMan= async (formData : DeliveryManUpdateForm) => {
    try {
        const url = `/deliveryMan/update`
        const {data} = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export const changeStatusDeliveryMan = async ({deliveryManId} : Pick<DeliveryManApi, 'deliveryManId'>) => {
    try {
        const url = `/deliveryMan/${deliveryManId}/status`
        const {data} = await api.patch<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            console.log(error);
            
        }
    }
}

export const changeAvailabilityDeliveryMan = async () => {
    try {
        const url = `/deliveryMan/availability`
        const {data} = await api.patch<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error);
            throw new Error(error.response.data.error);
        }
    }
}
export const getOrdersByDeliveryMan = async ({params = { page: 0, limit: 10}} : Pick<DeliveryManApi, 'params'>) => {
    try {
        const url = `/deliveryMan/orders`
        const {data} = await api.get(url, {params})
        const response = responseOrdersForDeliverySchema.safeParse(data)
        
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error);
            throw new Error(error.response.data.error);
        }
    }
}
export const getOrdersByDeliveryManById = async (orderId : number) => {
    try {
        const url = `/deliveryMan/orders/${orderId}`
        const {data} = await api.get(url)
        const response = orderDetailsForCustomerSchema.safeParse(data)
        console.log(response.error);
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error);
            throw new Error(error.response.data.error);
        }
    }
}