export function successResponse<T>(message: string, data?: T) {
    return {
        status: true,
        message,
        data,
    };
}