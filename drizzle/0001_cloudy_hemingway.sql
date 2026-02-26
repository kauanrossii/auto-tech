PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_vehicles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`model` text NOT NULL,
	`brand` text NOT NULL,
	`plate` text NOT NULL,
	`year` integer,
	`fuel` integer,
	`lastMileage` integer,
	`color` text,
	`chassi` text
);
--> statement-breakpoint
INSERT INTO `__new_vehicles`("id", "model", "brand", "plate", "year", "fuel", "lastMileage", "color", "chassi") SELECT "id", "model", "brand", "plate", "year", "fuel", "lastMileage", "color", "chassi" FROM `vehicles`;--> statement-breakpoint
DROP TABLE `vehicles`;--> statement-breakpoint
ALTER TABLE `__new_vehicles` RENAME TO `vehicles`;--> statement-breakpoint
PRAGMA foreign_keys=ON;