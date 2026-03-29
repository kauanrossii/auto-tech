import { Fuel } from "@shared/enums/fuel"
import { VehicleBrands } from "@shared/enums/vehicle-brands"
import { UpdateVehicleDto } from "@shared/interfaces/vehicles/update-vehicle.dto"
import { VehicleDto } from "@shared/interfaces/vehicles/vehicle.dto"
import type { VehicleForm } from "../types/vehicle-form"

export function vehicleFormToUpdateDto(
   form: VehicleForm
): UpdateVehicleDto | null {
   if (
      form.id == null ||
      form.model == null ||
      form.brand == null ||
      form.plate == null
   ) {
      return null
   }
   return {
      id: form.id,
      model: form.model,
      brand: form.brand as VehicleBrands,
      plate: form.plate,
      year: form.year,
      fuel: form.fuel,
      lastMileage: form.lastMileage,
      color: form.color,
      chassi: form.chassi,
   }
}

export function vehicleDtoToForm(dto: VehicleDto): VehicleForm {
   return {
      id: dto.id,
      model: dto.model,
      brand: dto.brand,
      plate: dto.plate,
      year: dto.year,
      fuel: dto.fuel as Fuel | null,
      lastMileage: dto.lastMileage,
      color: dto.color,
      chassi: dto.chassi,
   }
}
