import IAddressDto from "./IAddressDto";

export default interface ICustomerDto {
    id: number;
    address?: IAddressDto;
    type: number;
    name: string;
    govIdentifier?: string;
    govDocument?: string;
    cellphone?: string;
    phone?: string;
    email?: string;
};
