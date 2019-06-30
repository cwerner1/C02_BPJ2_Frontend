export interface AuthResponse {
    success: boolean;
    data: {
        id: number,
        email: string,
        access_token: string,
        expires_in: number
    };
}
