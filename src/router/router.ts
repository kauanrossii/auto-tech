import { createRouter, createWebHistory } from "vue-router"
import DefaultLayout from "../layouts/DefaultLayout.vue"
import HomeView from "../views/HomeView.vue"
import ListCustomersView from "../modules/customers/views/ListCustomersView.vue"
import ConfigurationsView from "../views/ConfigurationsView.vue"
import ListOrdersServiceView from "../modules/orders-service/views/ListOrdersServiceView.vue"
import ListVehiclesView from "../modules/vehicles/views/ListVehiclesView.vue"

const router = createRouter({
   routes: [
      {
         path: "",
         component: DefaultLayout,
         redirect: "home",
         children: [
            { path: "home", name: "home", component: HomeView },
            {
               path: "customers",
               name: "customers",
               component: ListCustomersView,
            },
            { path: "vehicles", name: "vehicles", component: ListVehiclesView },
            {
               path: "orders-service",
               name: "orders-service",
               component: ListOrdersServiceView,
            },
            {
               path: "configurations",
               name: "configurations",
               component: ConfigurationsView,
            },
         ],
      },
   ],
   history: createWebHistory(),
})

export default router
