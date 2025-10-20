import axios from "axios";

export const API_BASE_URL = "http://localhost:8080/api";

export class Rest {
    private static getAuthHeaders() {
        const token = localStorage.getItem("token");
        return token ?
            {Authorization: `Bearer ${token}`}
            : {};
    }

    static post(url: string, body: Object): Promise<any> {
        return axios.post(`${API_BASE_URL}/${url}`, body, {
            headers: this.getAuthHeaders()
        });
    }

    static get(url: string): Promise<any> {
        return axios.get(`${API_BASE_URL}/${url}`, {
            headers: this.getAuthHeaders()
        });
    }

    static put(url: string, body: Object): Promise<any> {
        return axios.put(`${API_BASE_URL}/${url}`, body, {
            headers: this.getAuthHeaders(),
        });
    }

    static delete(url: string): Promise<any> {
        return axios.delete(`${API_BASE_URL}/${url}`, {
            headers: this.getAuthHeaders(),
        });
    }
}


