export const VehicleRules = {
   plate: [(value: string) => !!value || "A placa é obrigatória."],
   model: [(value: string) => !!value || "O modelo é obrigatório."],
   brand: [(value: string) => !!value || "A montadora é obrigatória."],
}
