export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthSuccess {
    token: string;
}