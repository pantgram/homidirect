ALTER TABLE "users" ADD COLUMN "password_reset_token" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password_reset_expires" timestamp;--> statement-breakpoint
CREATE INDEX "listings_property_type_idx" ON "listings" USING btree ("property_type");--> statement-breakpoint
CREATE INDEX "listings_price_idx" ON "listings" USING btree ("price");--> statement-breakpoint
CREATE INDEX "listings_bedrooms_idx" ON "listings" USING btree ("bedrooms");--> statement-breakpoint
CREATE INDEX "listings_bathrooms_idx" ON "listings" USING btree ("bathrooms");--> statement-breakpoint
CREATE INDEX "listings_area_idx" ON "listings" USING btree ("area");--> statement-breakpoint
CREATE INDEX "listings_available_idx" ON "listings" USING btree ("available");--> statement-breakpoint
CREATE INDEX "listings_created_at_idx" ON "listings" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "listings_country_idx" ON "listings" USING btree ("country");--> statement-breakpoint
CREATE INDEX "listings_available_featured_idx" ON "listings" USING btree ("available","is_featured");--> statement-breakpoint
CREATE INDEX "listings_city_price_idx" ON "listings" USING btree ("city","price");--> statement-breakpoint
CREATE INDEX "listings_type_city_idx" ON "listings" USING btree ("property_type","city");--> statement-breakpoint
CREATE INDEX "listings_search_idx" ON "listings" USING gin (to_tsvector('english', coalesce("title", '') || ' ' || coalesce("description", '')));