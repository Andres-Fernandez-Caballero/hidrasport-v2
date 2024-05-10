export interface ResponseApiService {
    message: string;
    code: number;
    data?: unknown;
}

export interface ResponseApiServiceError {
    message: string;
    code: number
}