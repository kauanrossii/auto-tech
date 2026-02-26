export const CustomerRules = {
   name: [
      (value: string) => !!value || "Nome é obrigatório",
      (value: string) =>
         (value && value.length >= 3) || "Nome deve ter no mínimo 3 caracteres",
   ],
   type: [(value: number) => !!value || "Tipo é obrigatório"],
   email: [
      (value: string) =>
         !value ||
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
         "E-mail inválido",
   ],
}
