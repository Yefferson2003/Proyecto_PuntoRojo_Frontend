import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Order, orderDetailsForCustomerSchema, responseCustomerForAdminSchema, responseOrdersCustomerSchema } from "../types";

export async function getOrdersByCustomer(params = {}) {
    try {
        const {data} = await api.get(`/customer/orders`, {params} )
        const response = responseOrdersCustomerSchema.safeParse(data)
        
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function getOrdersByCustomerById(orderId: Order['id']) {
    try {
        const {data} = await api.get(`/customer/orders/${orderId}`)
        const response = orderDetailsForCustomerSchema.safeParse(data)
        console.log(response.error);
        
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
export async function getCustomers(params = {}) {
    try {
        const {data} = await api.get('/customer', {params})
        const response = responseCustomerForAdminSchema.safeParse(data)
        
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}