import { Fuel } from "./fuel.enum"

export class Vehicle {
   id: number

   constructor(
      public model: string,
      public brand: string,
      public plate: string,
      public year: number,
      public fuel: Fuel | null,
      public lastMileage?: number,
      public color?: string,
      public chassi?: string
   ) {}
}
