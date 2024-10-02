import { Part } from "./part";
import { PaymentModel } from "./paymentModel.enum";
import { Service } from "./service";

export class OrderOfService {
    id: number;
    active: boolean;

    public constructor(
        public customerId: number,
        public vehicleId: number,
        public totalValue: number,
        public parts: Part[],
        public services: Service[],
        public date: Date,
        public mileage?: number,
        public paymentModel?: PaymentModel,
        public observation?: string,
    ) { }
};
