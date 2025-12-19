ALTER TABLE "bookings" RENAME COLUMN "tenant_id" TO "candidate_id";--> statement-breakpoint
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_tenant_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_candidate_id_users_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" DROP COLUMN "last_name";--> statement-breakpoint
ALTER TABLE "listings" DROP COLUMN "price_per_room";--> statement-breakpoint
ALTER TABLE "listings" DROP COLUMN "max_tenants";--> statement-breakpoint
ALTER TABLE "listings" DROP COLUMN "shareable";