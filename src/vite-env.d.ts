/// <reference types="vite/client" />

import { Vehicle } from "../electron/main/entities/vehicle"

declare module "*.vue" {
   import type { DefineComponent } from "vue"
   const component: DefineComponent<{}, {}, any>
   export default component
}
