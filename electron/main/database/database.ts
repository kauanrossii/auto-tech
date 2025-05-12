import Database from "better-sqlite3";
import fs from "node:fs";
import { app } from "electron";
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import path from 'node:path';
import * as schema from './schema';

let dbInstance: BetterSQLite3Database<typeof schema> | null;

function getDatabaseConnection() {
    if (dbInstance) {
        return dbInstance;
    }

    const isDev = process.env.NODE_ENV === 'development';
    const productionDbPath = path.join(app.getPath('appData'), '/auto-esporte/data');

    if (!isDev && !fs.existsSync(productionDbPath)) {
        fs.mkdirSync(productionDbPath);
    }

    const dbPath = isDev
        ? './electron/main/database/auto_esporte.db' : path.join(productionDbPath, 'auto_esporte.db');

    const sqlite = new Database(dbPath);
    sqlite.pragma('journal_mode = WAL');
    const database = drizzle(sqlite, { schema });

    dbInstance = database;
    return database;
}

function runMigrations() {
    const migrationsPath = process.env.NODE_ENV === 'development'
        ? './drizzle'
        : process.resourcesPath + '/drizzle'
    migrate(dbInstance, { migrationsFolder: migrationsPath });
}

export { getDatabaseConnection, runMigrations };