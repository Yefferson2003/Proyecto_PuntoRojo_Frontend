import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { categoriesSchema, Category, CategoryFormData, formCategorySchema } from "../types";

type CategoryAPI = {
    formData : CategoryFormData
    categoryId: Category['id']
}


export async function getCategories(params = {}) {
    try {
        const {data} = await api.get(`/categories`, {params})
        const response = categoriesSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getCategoryById({categoryId} : Pick<CategoryAPI, 'categoryId'>) {
    try {
        const {data} = await api.get(`/categories/${categoryId}`)
        const response = formCategorySchema.safeParse(data)
        if (response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
export async function createCategory({formData} : Pick<CategoryAPI, 'formData'>) {
    try {
        const {data} = await api.post<string>('/categories', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateCategory({formData, categoryId}: Pick<CategoryAPI, 'formData' | 'categoryId'>) {
    try {
        const {data} = await api.put<string>(`/categories/${categoryId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function changeVisibilityCategory({categoryId} : Pick<CategoryAPI, 'categoryId'>) {
    try {
        const {data} = await api.patch<string>(`/categories/${categoryId}/visibility`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}