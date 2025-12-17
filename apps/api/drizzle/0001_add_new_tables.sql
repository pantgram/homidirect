CREATE TYPE "public"."booking_status" AS ENUM('PENDING', 'CONFIRMED', 'DECLINED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('apartment', 'house', 'studio', 'room');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('LANDLORD', 'TENANT');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "booking_status" DEFAULT 'PENDING',
	"scheduled_at" timestamp NOT NULL,
	"meet_link" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"tenant_id" integer NOT NULL,
	"landlord_id" integer NOT NULL,
	"listing_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listing_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(500) NOT NULL,
	"listing_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"title" varchar(100) NOT NULL,
	"price" real NOT NULL,
	"price_per_room" real,
	"city" varchar(100) NOT NULL,
	"postal_code" varchar(50),
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"area" real NOT NULL,
	"country" varchar(255) DEFAULT 'Greece',
	"max_tenants" integer,
	"shareable" boolean DEFAULT false NOT NULL,
	"property_type" "property_type" NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"landlord_id" integer NOT NULL,
	CONSTRAINT "listings_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_landlord_id_users_id_fk" FOREIGN KEY ("landlord_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_landlord_id_users_id_fk" FOREIGN KEY ("landlord_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;