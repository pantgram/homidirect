ALTER TABLE "interested_listings" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "listing_tags" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "interested_listings" CASCADE;--> statement-breakpoint
DROP TABLE "listing_tags" CASCADE;--> statement-breakpoint
ALTER TABLE "listing_images" ALTER COLUMN "listing_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "listing_images" ADD COLUMN "upload_session_id" varchar(36);--> statement-breakpoint
ALTER TABLE "listing_images" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;