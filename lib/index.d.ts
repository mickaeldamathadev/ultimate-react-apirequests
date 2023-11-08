type ApiResponse<T> = {
    data?: T;
    error?: string;
    status?: number;
};
type NestedRoutes<T> = {
    [K in keyof T]?: string;
};
declare function post<T>(baseUrl: string, nestedRoutes: NestedRoutes<T>, data: T): Promise<ApiResponse<T>>;
declare function put<T>(baseUrl: string, nestedRoutes: NestedRoutes<T>, data: T | Partial<T>): Promise<ApiResponse<T>>;
declare function patch<T>(baseUrl: string, nestedRoutes: NestedRoutes<T>, data: Partial<T>): Promise<ApiResponse<T>>;
declare function get<T>(baseUrl: string, nestedRoutes?: NestedRoutes<T>): Promise<ApiResponse<T>>;
declare function del<T>(baseUrl: string, nestedRoutes: NestedRoutes<T>): Promise<ApiResponse<void>>;
export { del, get, patch, post, put };
