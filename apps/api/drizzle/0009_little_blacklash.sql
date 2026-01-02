CREATE TABLE "interested_listings" (
	"user_id" integer NOT NULL,
	"listing_id" integer NOT NULL,
	CONSTRAINT "interested_listings_user_id_listing_id_pk" PRIMARY KEY("user_id","listing_id")
);
--> statement-breakpoint
CREATE TABLE "listing_tags" (
	"listing_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "listing_tags_tag_id_listing_id_pk" PRIMARY KEY("tag_id","listing_id")
);
--> statement-breakpoint
ALTER TABLE "interested_listings" ADD CONSTRAINT "interested_listings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interested_listings" ADD CONSTRAINT "interested_listings_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_tags" ADD CONSTRAINT "listing_tags_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_tags" ADD CONSTRAINT "listing_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;