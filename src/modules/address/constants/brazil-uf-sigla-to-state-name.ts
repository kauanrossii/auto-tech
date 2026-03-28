/**
 * Sigla da UF (como retornada pelo ViaCEP) → nome do estado,
 * alinhado a listas de autocomplete que usam o nome por extenso.
 */
export const BRAZIL_UF_SIGLA_TO_STATE_NAME: Record<string, string> = {
   AC: "Acre",
   AL: "Alagoas",
   AP: "Amapá",
   AM: "Amazonas",
   BA: "Bahia",
   CE: "Ceará",
   DF: "Distrito Federal",
   ES: "Espírito Santo",
   GO: "Goiás",
   MA: "Maranhão",
   MT: "Mato Grosso",
   MS: "Mato Grosso do Sul",
   MG: "Minas Gerais",
   PA: "Pará",
   PB: "Paraíba",
   PR: "Paraná",
   PE: "Pernambuco",
   PI: "Piauí",
   RJ: "Rio de Janeiro",
   RN: "Rio Grande do Norte",
   RS: "Rio Grande do Sul",
   RO: "Rondônia",
   RR: "Roraima",
   SC: "Santa Catarina",
   SP: "São Paulo",
   SE: "Sergipe",
   TO: "Tocantins",
}

export function mapBrazilUfSiglaToStateName(sigla: string): string {
   return BRAZIL_UF_SIGLA_TO_STATE_NAME[sigla] ?? sigla
}
