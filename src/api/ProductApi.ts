import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Product, ProductFormData, productSchema, responseProductsSchema } from "../types";

type ProductAPI = {
    formData: ProductFormData
    productId: Product['id']
    page: number
    limit: number
    file: File | null
}
const cloudName = import.meta.env.VITE_CLOUD_NAME
const uploadPreset = 'saveImg'

export async function getProduts(params = {}) {
    try {
        const {data} = await api.get(`/products`, {params})
        const response = responseProductsSchema.safeParse(data)
        // console.log(data);
        
        // console.log(response.error);
        
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);  
        }
    }
}

export async function getProductById({productId}: Pick<ProductAPI, 'productId'>) {
    try {
        const {data} = await api.get(`/products/${productId}`)
        const response = productSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function uploadImageToCloudinary(image: File): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();
    
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset); // Definido en tu cuenta de Cloudinary

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
            return data.secure_url; // Retorna la URL de la imagen subida
        } else {
            throw new Error("No se pudo subir la imagen.");
        }
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
}


export async function createProduct({formData}: Pick<ProductAPI, 'formData'>) {
    try {
        const {data} = await api.post<string>(`/products`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
    
}

export async function updateProduct({formData, productId}: Pick<ProductAPI, 'formData' | 'productId'>) {
    try {
        const {data} = await api.put<string>(`/products/${productId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function changeAvailabilityProduct({productId}: Pick<ProductAPI, 'productId'>) {
    try {
        const {data} = await api.patch<string>(`/products/${productId}/availability`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
export async function changeOfferProduct({productId}: Pick<ProductAPI, 'productId'>) {
    try {
        const {data} = await api.patch<string>(`/products/${productId}/offer`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}