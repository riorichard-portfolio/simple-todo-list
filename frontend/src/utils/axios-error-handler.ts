import axios from "axios";

export function axiosErrorHandler(err: unknown): string {
    if (axios.isAxiosError(err)) {
        if (err.response) return err.response.data?.message || "error response tidak diketahui";
        if (err.request) return 'tidak ada response dari server'
        return `unknown error: ${err.message}`
    } else {
        return `unexpected error: ${err}`
    }
}