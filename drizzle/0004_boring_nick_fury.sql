CREATE TABLE "products" (
	"id" bigint PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image_url" text,
	"price" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;