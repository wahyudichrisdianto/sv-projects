CREATE TABLE `resume` (
	`id` text PRIMARY KEY NOT NULL DEFAULT 'main',
	`full_name` text NOT NULL DEFAULT '',
	`headline` text NOT NULL DEFAULT '',
	`location` text,
	`email` text,
	`phone` text,
	`website` text,
	`linkedin` text,
	`summary` text,
	`skills` text,
	`include_projects` integer NOT NULL DEFAULT 0,
	`include_collaborations` integer NOT NULL DEFAULT 0,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `resume_experience` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`company` text NOT NULL,
	`location` text,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL DEFAULT 'Present',
	`bullets` text,
	`tech_stack` text,
	`sort` integer NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `resume_education` (
	`id` text PRIMARY KEY NOT NULL,
	`degree` text NOT NULL,
	`institution` text NOT NULL,
	`location` text,
	`period` text,
	`detail` text,
	`sort` integer NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `resume_certification` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`issuer` text,
	`date` text,
	`sort` integer NOT NULL DEFAULT 0
);
