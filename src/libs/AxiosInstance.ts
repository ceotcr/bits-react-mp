import axios from "axios";
export const AxiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        "Content-Type": "application/json"
    },
    validateStatus: (status) => status >= 200 && status < 300
})

AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            let message = "An unexpected error occurred";

            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        message = "Bad Request: Please check your input.";
                        break;
                    case 401:
                        message = "Unauthorized: Invalid credentials.";
                        break;
                    case 403:
                        message = "Forbidden: You don't have permission.";
                        break;
                    case 404:
                        message = "Not Found: The requested resource does not exist.";
                        break;
                    case 500:
                        message = "Server Error: Please try again later.";
                        break;
                    default:
                        message = error.response.data?.message || "Something went wrong.";
                }
            } else if (error.request) {
                message = "Network error: Please check your internet connection.";
            } else {
                message = error.message;
            }

            return Promise.reject(new Error(message));
        }

        return Promise.reject(error);
    }
);