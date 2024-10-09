export default interface IAddressDto {
    id: number;
    cep: string;
    uf?: string;
    city?: string;
    district?: string;
    street?: string;
    unit?: string;
};
