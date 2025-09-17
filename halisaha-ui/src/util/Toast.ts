import {toast} from "react-toastify";

export class Toast {
    static success(text: string) {
        toast.success(text);
    }

    static error(text: string) {
        toast.error(text);
    }

    static warning(text: string) {
        toast.warning(text);
    }

    static info(text: string) {
        toast.info(text);
    }
}