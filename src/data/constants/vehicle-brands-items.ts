import { VehicleBrands } from "@shared/enums/vehicle-brands"

const VehicleBrandLabels: Record<VehicleBrands, string> = {
   [VehicleBrands.AUDI]: "Audi",
   [VehicleBrands.BMW]: "BMW",
   [VehicleBrands.BYD]: "BYD",
   [VehicleBrands.CHERY]: "Chery",
   [VehicleBrands.CHEVROLET]: "Chevrolet",
   [VehicleBrands.CITROEN]: "Citroën",
   [VehicleBrands.FIAT]: "Fiat",
   [VehicleBrands.FORD]: "Ford",
   [VehicleBrands.HONDA]: "Honda",
   [VehicleBrands.HYUNDAI]: "Hyundai",
   [VehicleBrands.JAC]: "JAC",
   [VehicleBrands.JEEP]: "Jeep",
   [VehicleBrands.KIA]: "Kia",
   [VehicleBrands.LAND_ROVER]: "Land Rover",
   [VehicleBrands.MERCEDES_BENZ]: "Mercedes-Benz",
   [VehicleBrands.MITSUBISHI]: "Mitsubishi",
   [VehicleBrands.NISSAN]: "Nissan",
   [VehicleBrands.PEUGEOT]: "Peugeot",
   [VehicleBrands.RENAULT]: "Renault",
   [VehicleBrands.SUBARU]: "Subaru",
   [VehicleBrands.SUZUKI]: "Suzuki",
   [VehicleBrands.TESLA]: "Tesla",
   [VehicleBrands.TOYOTA]: "Toyota",
   [VehicleBrands.VOLKSWAGEN]: "Volkswagen",
   [VehicleBrands.VOLVO]: "Volvo",
   [VehicleBrands.OTHER]: "Outro",
}

const VehicleBrandSelectItems = Object.entries(VehicleBrandLabels).map(
   ([key, value]) => ({
      title: value,
      value: key,
   })
)

export { VehicleBrandLabels, VehicleBrandSelectItems }
