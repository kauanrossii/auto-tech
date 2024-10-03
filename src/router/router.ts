import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CustomersView from "../views/CustomersView.vue";
import OrdersServiceView from "../views/OrdersServiceView.vue";
import VehiclesView from "../views/VehiclesView.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const router = createRouter({
    routes: [
        {
            path: '',
            component: DefaultLayout,
            redirect: "home",
            children: [
                { path: "home", component: HomeView },
                { path: "customers", component: CustomersView },
                { path: "vehicles", component: VehiclesView },
                { path: "orders-service", component: OrdersServiceView },
                { path: "configurations", component: OrdersServiceView }
            ]
        }
    ],
    history: createWebHistory()
})

export default router;