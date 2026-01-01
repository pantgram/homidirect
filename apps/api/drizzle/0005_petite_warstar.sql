CREATE TYPE "public"."featured_purchase_status" AS ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."message_status" AS ENUM('SENT', 'DELIVERED', 'READ');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('UTILITY_BILL', 'TITLE_DEED', 'LEASE_AGREEMENT', 'PROPERTY_TAX', 'OTHER');--> statement-breakpoint
ALTER TYPE "public"."user_role" ADD VALUE 'ADMIN';--> statement-breakpoint
CREATE TABLE "availability_slots" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" integer NOT NULL,
	"landlord_id" integer NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"is_booked" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" integer NOT NULL,
	"landlord_id" integer NOT NULL,
	"tenant_id" integer NOT NULL,
	"last_message_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "conversations_listing_landlord_tenant_unique" UNIQUE("listing_id","landlord_id","tenant_id")
);
--> statement-breakpoint
CREATE TABLE "featured_listing_purchases" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" integer NOT NULL,
	"purchased_by" integer NOT NULL,
	"amount" real NOT NULL,
	"currency" varchar(3) DEFAULT 'EUR' NOT NULL,
	"status" "featured_purchase_status" DEFAULT 'PENDING' NOT NULL,
	"starts_at" timestamp NOT NULL,
	"expires_at" timestamp NOT NULL,
	"payment_reference" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversation_id" integer NOT NULL,
	"sender_id" integer NOT NULL,
	"content" text NOT NULL,
	"status" "message_status" DEFAULT 'SENT' NOT NULL,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" integer NOT NULL,
	"document_type" "document_type" NOT NULL,
	"url" varchar(500) NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"uploaded_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" integer NOT NULL,
	"previous_status" "verification_status",
	"new_status" "verification_status" NOT NULL,
	"notes" text,
	"reviewed_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "availability_slot_id" integer;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN "verification_status" "verification_status" DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN "verified_at" timestamp;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN "verified_by" integer;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN "is_featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN "featured_until" timestamp;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN "title_el" varchar(100);--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN "description_el" text;--> statement-breakpoint
ALTER TABLE "availability_slots" ADD CONSTRAINT "availability_slots_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "availability_slots" ADD CONSTRAINT "availability_slots_landlord_id_users_id_fk" FOREIGN KEY ("landlord_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_landlord_id_users_id_fk" FOREIGN KEY ("landlord_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "featured_listing_purchases" ADD CONSTRAINT "featured_listing_purchases_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "featured_listing_purchases" ADD CONSTRAINT "featured_listing_purchases_purchased_by_users_id_fk" FOREIGN KEY ("purchased_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_documents" ADD CONSTRAINT "verification_documents_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_documents" ADD CONSTRAINT "verification_documents_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_history" ADD CONSTRAINT "verification_history_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_history" ADD CONSTRAINT "verification_history_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "availability_slots_listing_id_idx" ON "availability_slots" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "availability_slots_landlord_id_idx" ON "availability_slots" USING btree ("landlord_id");--> statement-breakpoint
CREATE INDEX "availability_slots_start_time_idx" ON "availability_slots" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX "availability_slots_is_booked_idx" ON "availability_slots" USING btree ("is_booked");--> statement-breakpoint
CREATE INDEX "conversations_listing_id_idx" ON "conversations" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "conversations_landlord_id_idx" ON "conversations" USING btree ("landlord_id");--> statement-breakpoint
CREATE INDEX "conversations_tenant_id_idx" ON "conversations" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "conversations_last_message_at_idx" ON "conversations" USING btree ("last_message_at");--> statement-breakpoint
CREATE INDEX "featured_purchases_listing_id_idx" ON "featured_listing_purchases" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "featured_purchases_status_idx" ON "featured_listing_purchases" USING btree ("status");--> statement-breakpoint
CREATE INDEX "featured_purchases_expires_at_idx" ON "featured_listing_purchases" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "messages_conversation_id_idx" ON "messages" USING btree ("conversation_id");--> statement-breakpoint
CREATE INDEX "messages_sender_id_idx" ON "messages" USING btree ("sender_id");--> statement-breakpoint
CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "messages_status_idx" ON "messages" USING btree ("status");--> statement-breakpoint
CREATE INDEX "verification_docs_listing_id_idx" ON "verification_documents" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "verification_history_listing_id_idx" ON "verification_history" USING btree ("listing_id");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_availability_slot_id_availability_slots_id_fk" FOREIGN KEY ("availability_slot_id") REFERENCES "public"."availability_slots"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bookings_candidate_id_idx" ON "bookings" USING btree ("candidate_id");--> statement-breakpoint
CREATE INDEX "bookings_landlord_id_idx" ON "bookings" USING btree ("landlord_id");--> statement-breakpoint
CREATE INDEX "bookings_listing_id_idx" ON "bookings" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "bookings_availability_slot_id_idx" ON "bookings" USING btree ("availability_slot_id");--> statement-breakpoint
CREATE INDEX "listings_verification_status_idx" ON "listings" USING btree ("verification_status");--> statement-breakpoint
CREATE INDEX "listings_is_featured_idx" ON "listings" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "listings_featured_until_idx" ON "listings" USING btree ("featured_until");--> statement-breakpoint
CREATE INDEX "listings_city_idx" ON "listings" USING btree ("city");--> statement-breakpoint
CREATE INDEX "listings_landlord_id_idx" ON "listings" USING btree ("landlord_id");