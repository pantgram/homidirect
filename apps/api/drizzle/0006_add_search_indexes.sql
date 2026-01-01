-- Search optimization indexes for listings table
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_property_type_idx" ON "listings" USING btree ("property_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_price_idx" ON "listings" USING btree ("price");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_bedrooms_idx" ON "listings" USING btree ("bedrooms");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_bathrooms_idx" ON "listings" USING btree ("bathrooms");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_area_idx" ON "listings" USING btree ("area");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_available_idx" ON "listings" USING btree ("available");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_created_at_idx" ON "listings" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_country_idx" ON "listings" USING btree ("country");--> statement-breakpoint
-- Composite indexes for common search patterns
CREATE INDEX IF NOT EXISTS "listings_available_featured_idx" ON "listings" USING btree ("available", "is_featured");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_city_price_idx" ON "listings" USING btree ("city", "price");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_type_city_idx" ON "listings" USING btree ("property_type", "city");--> statement-breakpoint
-- Full-text search index (GIN index for tsvector)
CREATE INDEX IF NOT EXISTS "listings_search_idx" ON "listings" USING gin (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')));--> statement-breakpoint
-- Greek full-text search index for bilingual support
CREATE INDEX IF NOT EXISTS "listings_search_el_idx" ON "listings" USING gin (to_tsvector('simple', coalesce(title_el, '') || ' ' || coalesce(description_el, '')));
