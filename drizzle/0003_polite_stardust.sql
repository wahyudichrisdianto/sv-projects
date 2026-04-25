CREATE TABLE `experience` (
	`id` text PRIMARY KEY NOT NULL,
	`role` text NOT NULL,
	`company` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text DEFAULT 'Present' NOT NULL,
	`description` text NOT NULL,
	`technologies` text,
	`created_at` integer
);
