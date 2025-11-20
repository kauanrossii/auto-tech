import { Fuel } from "@shared/enums/fuel"

export class Vehicle {
   id: number

   constructor(
      public model: string,
      public brand: string,
      public plate: string,
      public year: number,
      public fuel: Fuel | null,
      public lastMileage: number | null,
      public color: string | null,
      public chassi: string | null
   ) {}
}
