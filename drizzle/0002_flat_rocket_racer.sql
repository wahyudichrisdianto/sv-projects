CREATE TABLE `project` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`year` text NOT NULL,
	`image` text,
	`link` text,
	`tags` text,
	`featured` integer DEFAULT false NOT NULL,
	`created_at` integer
);
