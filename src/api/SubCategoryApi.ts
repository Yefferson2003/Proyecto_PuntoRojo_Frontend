import { isAxiosError } from "axios"
import { Category, SubCategory, SubCategoryFormData, subCategorySchema } from "../types"
import api from "@/lib/axios"

type SubCategoryAPI = {
    dataForm: SubCategoryFormData
    categoryId: Category['id']
    subCategoryId: SubCategory['id']
}

export async function getSubcategoryById({categoryId, subCategoryId}: Pick<SubCategoryAPI, 'categoryId' | 'subCategoryId'>) {
    try {
        const {data} = await api.get(`/categories/${categoryId}/subcategories/${subCategoryId}`)
        const response = subCategorySchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createSubCategory({dataForm, categoryId}:Pick<SubCategoryAPI, 'dataForm' | 'categoryId'>) {
    try {
        const {data} = await api.post<string>(`/categories/${categoryId}/subcategories`, dataForm)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateSubCategory({dataForm, categoryId, subCategoryId}:Pick<SubCategoryAPI, 'dataForm' | 'categoryId' | 'subCategoryId'>) {
    try {
        const {data} = await api.put<string>(`/categories/${categoryId}/subcategories/${subCategoryId}`, dataForm)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function changeVisibilitySubCategory({categoryId, subCategoryId}:Pick<SubCategoryAPI, 'categoryId' | 'subCategoryId'>) {
    try {
        const {data} = await api.patch<string>(`/categories/${categoryId}/subcategories/${subCategoryId}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

