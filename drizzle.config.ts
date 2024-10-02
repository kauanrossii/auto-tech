import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema:'./electron/main/database/schema.ts',
    out: './drizzle',
    dialect: 'sqlite'
})