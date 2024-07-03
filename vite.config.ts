import Components from "unplugin-vue-components/vite"; 
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";

export default defineAppConfig({
     plugins: [
         Components({
               resolvers: [PrimeVueResolver()],
         }),
     ],
});