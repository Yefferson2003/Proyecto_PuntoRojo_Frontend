import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Customer, responseReviewsVisibilitySchama, ReviewForm, reviewSchema } from "../types";

type ReviewApi = {
    formData: ReviewForm
    customerId: Customer['id']
}

export async function getReviewByCustomer() {
    try {
        const url = `/review`
        const {data} = await api.get(url)
        
        const response = reviewSchema.safeParse(data)
        
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getReviewsVisibility(params = {}) {
    try {
        const url = `/review/visibility`
        const {data} = await api.get(url, {params})
        
        const response = responseReviewsVisibilitySchama.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createReview({formData} : Pick<ReviewApi, 'formData'>) {
    try {
        const url = `/review`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error);
            
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateReview({formData} : Pick<ReviewApi, 'formData'>) {
    try {
        const url = `/review`
        const {data} = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteReview() {
    try {
        const url = `/review`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
export async function changeVisibilityReview({customerId} : Pick<ReviewApi, 'customerId'>) {
    try {
        const url = `/review/${customerId}`
        const {data} = await api.patch<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}