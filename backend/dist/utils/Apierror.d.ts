declare class ApiError extends Error {
    statusCode: number;
    data: null;
    success: false;
    errors: string[];
    constructor(statusCode: number, message?: string, errors?: string[], stack?: string);
}
export { ApiError };
//# sourceMappingURL=Apierror.d.ts.map