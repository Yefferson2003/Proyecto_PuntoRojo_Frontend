import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { DeliveryMan, Order, OrderFormData, orderSchema, Product, responseDateCount, responseDateDetails, responseOrdersSchema } from "../types"

export type OrderApiType = {
    formData: OrderFormData
    orderId: Order['id']
    status: 'inReview'| 'pending'| 'packaging'| 'sending'| 'ready'| 'completed'| 'return'| 'cancel'
    productIds: Product['id'][]
    deliveryManId: DeliveryMan['id']
}

export async function getOrders (params = {}) {
    try {
        const {data} = await api.get('/orders', {params})
        
        const response = responseOrdersSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response)  {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function getOrder({orderId} : Pick<OrderApiType, 'orderId'> ) {
    try {
        const {data} = await api.get(`/orders/${orderId}`)
        
        const response = orderSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function createOrder({formData} : Pick<OrderApiType, 'formData'>) {
    try {
        const {data} = await api.post<string>('/orders',formData); 
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function updateOrder({status, orderId, productIds} : Pick<OrderApiType, 'status' | 'orderId' | 'productIds'>) {
    try {
        const formData = {
            status,
            productIds
        }
        const {data} = await api.patch<string>(`/orders/${orderId}/orderDetails`, formData ) 
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function changeStatusOrder({orderId, status} : Pick<OrderApiType, 'orderId' | 'status'> ) {
    try {
        const {data} = await api.patch<string>(`/orders/${orderId}/status`, {status: status} )
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function getDataForChart(params = {}) {
    try {
        const {data} = await api.get(`/orders/data/chart`, {params})
        const response = responseDateCount.safeParse(data)
        if (response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function getDataDetailsForChart(params = {}) {
    try {
        const {data} = await api.get(`/orders/data/chart/details`, {params})
        const response = responseDateDetails.safeParse(data)
        if (response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function assignDeliveryManOrder({orderId, deliveryManId} : Pick<OrderApiType, 'orderId' | 'deliveryManId' > ) {
    try {
        const {data} = await api.patch<string>(`/orders/${orderId}/deliveryMan`, {deliveryManId} )
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}


