export class Service {
    id: number;

    public constructor(
        public orderOfServiceId: number,
        public description: string,
        public price: number
    ) { }
};
