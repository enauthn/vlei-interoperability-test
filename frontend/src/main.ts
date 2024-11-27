import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PrimeVue from "primevue/config";
import "./style.css";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faXmarkCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

library.add([faXmarkCircle, faCircleCheck]);
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
app.use(PrimeVue);
