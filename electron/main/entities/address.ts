export class Address {
   id: number

   constructor(
      public cep: string,
      public uf: string | null,
      public city: string | null,
      public district: string | null,
      public street: string | null,
      public unit: string | null
   ) {}
}
