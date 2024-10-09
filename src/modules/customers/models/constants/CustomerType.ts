import IBaseDisplayEnum from "../../../shared/models/components/IBaseDisplayEnum";

export const PersonType: readonly IBaseDisplayEnum[] = Object.freeze([
    { value: 1, title: "Física", subtitle: 'Classificação do ser humano enquanto indivíduo' },
    { value: 2, title: "Jurídica", subtitle: 'Representa uma entidade, como uma empresa' }
] as const);
