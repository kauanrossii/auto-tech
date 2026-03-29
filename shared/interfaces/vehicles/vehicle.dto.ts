/** Veículo completo retornado por getById / getByPlate (espelha o registro persistido). */
export interface VehicleDto {
   id: number
   model: string
   brand: string
   plate: string
   year: number | null
   fuel: number | null
   lastMileage: number | null
   color: string | null
   chassi: string | null
}

/** Item da listagem paginada de veículos. */
export interface VehicleListItemDto {
   id: number
   model: string
   brand: string
   plate: string
   year: number | null
   color: string | null
}
