import { useToast } from "primevue/usetoast";

export default defineNuxtPlugin({
    name: "common",
    setup() {
        const toast = useToast();
        const hello = () => {
            console.log("Hello World");
        };
        const showSuccess = (msg: string) => {
            toast.add({ severity: 'success', summary: 'Thành công', detail: msg, life: 3000 });
        };
        const showError = (msg: string) => {
            toast.add({ severity: 'error', summary: 'Thất bại', detail: msg, life: 3000 });
        };
        const showWarning = (msg: string) => {
            toast.add({ severity: 'warn', summary: 'Thất bại', detail: msg, life: 3000 });
        };
        return {
            provide: {
                common: {
                    hello,
                    showSuccess,
                    showError,
                    showWarning,
                }
            }
        }
    }

});