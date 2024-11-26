import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserPasswordForm, UserRegistrationForm, UserUpdateForm } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = 'auth/create-accouth/customer'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = 'auth/confirm-accounth/customer'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function resquestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = 'auth/resquest-code'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function login(formData: UserLoginForm) {
    try {
        const url = 'auth/login'
        const {data} = await api.post<string>(url, formData)
        
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}
export async function validateToken(formData: ConfirmToken) {
    try {
        const url = '/auth/validate-token'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}
export async function updatePassword({token, formData}: { token: ConfirmToken['token'], formData:  NewPasswordForm}) {
    try {
        const url = `/auth/update-password/${token}`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function getUser() {
    try {
        const { data } = await api.get('/auth/user');
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("Error al obtener el usuario.");
        }
    }
}

export async function updateCustomer({formData}: { formData:  UserUpdateForm}) {
    try {
        const url = `/auth/customer/update`
        const {data} = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function ValidatePassword({formData}: { formData:  UserPasswordForm}) {
    try {
        const url = `/auth/validate-password`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}
export async function updatePasswordAccount({formData}: { formData:  UserPasswordForm}) {
    try {
        const url = `/auth/update-password`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }
}
