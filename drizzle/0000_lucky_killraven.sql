CREATE TABLE `packing` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`owner` text NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`version` integer DEFAULT 1 NOT NULL
);
