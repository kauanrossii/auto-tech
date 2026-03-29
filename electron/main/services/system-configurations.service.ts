import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import { eq, desc } from "drizzle-orm"
import { getDatabaseConnection } from "../database/database"
import * as schema from "../database/schema"
import { SystemConfigurationDto } from "@shared/interfaces/system-configurations/system-configuration.dto"
import { UpdateSystemConfigurationDto } from "@shared/interfaces/system-configurations/update-system-configuration.dto"

class SystemConfigurationsService {
   private readonly _database: BetterSQLite3Database<typeof schema>

   public constructor() {
      this._database = getDatabaseConnection()
   }

   private mapToDto(row: {
      id: number
      companyName: string | null
      photoDataUrl: string | null
      photoFileName: string | null
      updatedAt: Date | null
   }): SystemConfigurationDto {
      return {
         id: row.id,
         companyName: row.companyName,
         photoDataUrl: row.photoDataUrl,
         photoFileName: row.photoFileName,
         updatedAt: row.updatedAt,
      }
   }

   async getAsync(): Promise<SystemConfigurationDto | null> {
      const row = await this._database.query.systemConfigurations.findFirst({
         orderBy: [desc(schema.systemConfigurations.id)],
      })

      if (!row) return null

      return this.mapToDto(row as any)
   }

   async upsertAsync(
      dto: UpdateSystemConfigurationDto
   ): Promise<SystemConfigurationDto> {
      const existing = await this._database.query.systemConfigurations.findFirst({
         orderBy: [desc(schema.systemConfigurations.id)],
      })

      const now = new Date()

      if (!existing) {
         const inserted = await this._database
            .insert(schema.systemConfigurations)
            .values({
               companyName: dto.companyName,
               photoDataUrl: dto.photoDataUrl,
               photoFileName: dto.photoFileName,
               updatedAt: now,
            })
            .returning({
               id: schema.systemConfigurations.id,
               companyName: schema.systemConfigurations.companyName,
               photoDataUrl: schema.systemConfigurations.photoDataUrl,
               photoFileName: schema.systemConfigurations.photoFileName,
               updatedAt: schema.systemConfigurations.updatedAt,
            })

         return this.mapToDto(inserted[0] as any)
      }

      const updated = await this._database
         .update(schema.systemConfigurations)
         .set({
            companyName: dto.companyName,
            photoDataUrl: dto.photoDataUrl,
            photoFileName: dto.photoFileName,
            updatedAt: now,
         })
         .where(eq(schema.systemConfigurations.id, (existing as any).id))
         .returning({
            id: schema.systemConfigurations.id,
            companyName: schema.systemConfigurations.companyName,
            photoDataUrl: schema.systemConfigurations.photoDataUrl,
            photoFileName: schema.systemConfigurations.photoFileName,
            updatedAt: schema.systemConfigurations.updatedAt,
         })

      return this.mapToDto(updated[0] as any)
   }
}

export default new SystemConfigurationsService()

