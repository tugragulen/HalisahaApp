import axios from "axios";

export const API_BASE_URL = "http://localhost:8080/api";

export class Rest {
    static post(url: string, body: Object): Promise<any> {
        return axios.post(`${API_BASE_URL}/${url}`, body);
    }
}


