import { Fuel } from "@shared/enums/fuel"

const FuelLabels: Record<Fuel, string> = {
   [Fuel.GAS]: "Gasolina",
   [Fuel.ETHANOL]: "Etanol",
   [Fuel.FLEX]: "Flex",
   [Fuel.DIESEL]: "Diesel",
   [Fuel.ELECTRIC]: "Elétrico",
   [Fuel.HYBRID]: "Híbrido",
   [Fuel.GNV]: "GNV",
   [Fuel.OTHER]: "Outro",
}

const FuelSelectItems = Object.entries(FuelLabels).map(([key, value]) => ({
   title: value,
   value: Number(key),
}))

export { FuelLabels, FuelSelectItems }
