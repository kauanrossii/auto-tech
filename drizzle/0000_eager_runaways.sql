CREATE TABLE `addresses` (
	`id` integer PRIMARY KEY NOT NULL,
	`cep` text NOT NULL,
	`uf` text,
	`city` text,
	`district` text,
	`street` text,
	`unit` text
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` integer PRIMARY KEY NOT NULL,
	`addressId` integer NOT NULL,
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
CREATE TABLE `ordersOfService` (
	`id` integer PRIMARY KEY NOT NULL,
	`customerId` integer NOT NULL,
	`vehicleId` integer NOT NULL,
	`date` integer NOT NULL,
	`totalValue` real NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`mileage` integer,
	`paymentModel` integer,
	`observation` text,
	FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`vehicleId`) REFERENCES `vehicles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `parts` (
	`id` integer PRIMARY KEY NOT NULL,
	`orderOfServiceId` integer NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	FOREIGN KEY (`orderOfServiceId`) REFERENCES `ordersOfService`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY NOT NULL,
	`orderOfServiceId` integer NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	FOREIGN KEY (`orderOfServiceId`) REFERENCES `ordersOfService`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`model` text NOT NULL,
	`sign` text NOT NULL,
	`year` integer NOT NULL,
	`fuel` integer,
	`lastMileage` integer,
	`color` text,
	`chassi` text
);
