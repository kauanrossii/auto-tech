import { Address } from "./address";

export class Customer {
    id: number;
    addressId: number;

    public constructor(
        public address: Address,
        public type: number,
        public name: string,
        public govIdentifier?: string,
        public govDocument?: string,
        public cellphone?: string,
        public phone?: string,
        public email?: string
    ) {}
};
