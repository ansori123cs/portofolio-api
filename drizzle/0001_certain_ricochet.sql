CREATE TABLE "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"portofolio_id" integer NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"posicion" varchar(255) NOT NULL,
	"description" text,
	"starting_year" varchar(10),
	"year_ends" varchar(10),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portofolio" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"judul" varchar(255) NOT NULL,
	"deskripsi" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skill" (
	"id" serial PRIMARY KEY NOT NULL,
	"portofolio_id" integer NOT NULL,
	"skill_name" varchar(255) NOT NULL,
	"level" varchar(50) DEFAULT 'mid',
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "experience" ADD CONSTRAINT "experience_portofolio_id_portofolio_id_fk" FOREIGN KEY ("portofolio_id") REFERENCES "public"."portofolio"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portofolio" ADD CONSTRAINT "portofolio_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill" ADD CONSTRAINT "skill_portofolio_id_portofolio_id_fk" FOREIGN KEY ("portofolio_id") REFERENCES "public"."portofolio"("id") ON DELETE cascade ON UPDATE no action;