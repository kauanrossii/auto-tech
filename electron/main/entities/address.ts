export class Address {
    id: number;

    constructor(
        public cep: string,
        public uf?: string,
        public city?: string,
        public district?: string,
        public street?: string,
        public unit?: string
    ) {}
}