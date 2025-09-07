import apiClient from "./client";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginGoogleRequest {
    credential: string;
}

export interface LoginResponse {
    token: string;
}

export const authApi = {
    login: (data: LoginRequest) => apiClient.post<LoginResponse>('/auth/login', data),
    loginGoogle: (data: LoginGoogleRequest) => apiClient.post<LoginResponse>('/auth/login/google', data)
}