import { createRouter, createWebHistory } from "vue-router"
import DefaultLayout from "../layouts/DefaultLayout.vue"
import HomeView from "../views/HomeView.vue"
import ListCustomersView from "../modules/customers/views/ListCustomersView.vue"
import ConfigurationsView from "../views/ConfigurationsView.vue"
import ListOrdersServiceView from "../modules/orders-service/views/ListOrdersServiceView.vue"
import ListVehiclesView from "../modules/vehicles/views/ListVehiclesView.vue"
import CreateOrderServiceView from "@src/modules/orders-service/views/CreateOrderServiceView.vue"
import { RoutesNames } from "./routes-names"

const router = createRouter({
   routes: [
      {
         path: "",
         component: DefaultLayout,
         redirect: "home",
         children: [
            { path: "home", name: RoutesNames.home, component: HomeView },
            {
               path: "customers",
               name: RoutesNames.customersList,
               component: ListCustomersView,
            },
            {
               path: "vehicles",
               name: RoutesNames.vehiclesList,
               component: ListVehiclesView,
            },
            {
               path: "orders-of-service",
               children: [
                  {
                     path: "",
                     name: RoutesNames.ordersOfServiceList,
                     component: ListOrdersServiceView,
                  },
                  {
                     path: "create",
                     name: RoutesNames.ordersOfServiceCreate,
                     component: CreateOrderServiceView,
                  },
               ],
            },
            {
               path: "configurations",
               name: RoutesNames.configurations,
               component: ConfigurationsView,
            },
         ],
      },
   ],
   history: createWebHistory(),
})

export default router
