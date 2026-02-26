PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_customers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`addressId` integer,
	`type` integer NOT NULL,
	`name` text NOT NULL,
	`govIdentifier` text,
	`govDocument` text,
	`cellphone` text,
	`phone` text,
	`email` text,
	FOREIGN KEY (`addressId`) REFERENCES `addresses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_customers`("id", "addressId", "type", "name", "govIdentifier", "govDocument", "cellphone", "phone", "email") SELECT "id", "addressId", "type", "name", "govIdentifier", "govDocument", "cellphone", "phone", "email" FROM `customers`;--> statement-breakpoint
DROP TABLE `customers`;--> statement-breakpoint
ALTER TABLE `__new_customers` RENAME TO `customers`;--> statement-breakpoint
PRAGMA foreign_keys=ON;