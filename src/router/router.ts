import { createRouter, createWebHistory } from "vue-router";
import OrdersServiceView from "../modules/orders-service/views/OrdersServiceView.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import HomeView from "../views/HomeView.vue";
import ListCustomersView from "../modules/customers/views/ListCustomersView.vue";
import ListVehiclesView from "../modules/vehicles/views/ListVehiclesView.vue";
import ConfigurationsView from "../views/ConfigurationsView.vue";

const router = createRouter({
    routes: [
        {
            path: '',
            component: DefaultLayout,
            redirect: "home",
            children: [
                { path: "home", component: HomeView },
                { path: "customers", component: ListCustomersView },
                { path: "vehicles", component: ListVehiclesView },
                { path: "orders-service", component: OrdersServiceView },
                { path: "configurations", component: ConfigurationsView }
            ]
        }
    ],
    history: createWebHistory()
})

export default router;