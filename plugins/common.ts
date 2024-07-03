export default defineNuxtPlugin({
    name: "common",
    setup() {
        const hello = () => {
            console.log("Hello World");
        } 

        return {
            provide: {
                hello
            }
        }
    }

});