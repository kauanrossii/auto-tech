export class Part {
    id: number;

    public constructor(
        public orderOfServiceId: number,
        public name: string,
        public price: number
    ) { }
};
