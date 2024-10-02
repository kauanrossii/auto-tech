import { Fuel } from "./fuel.enum";

export class Vehicle {
    id: number;

    constructor(
        public name: string,
        public model: string,
        public sign: string,
        public year: number,
        public fuel?: Fuel,
        public lastMileage?: number,
        public color?: string,
        public chassi?: string,
    ) { }
};