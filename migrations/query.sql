
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "membership_type" AS ENUM ('Premium', 'Normal');

CREATE TABLE "user" (
  "user_id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "fullname" varchar(255) NOT NULL,
  "membership" membership_type NOT NULL,
  "refresh_token" varchar(1000),
  "created_at" timestamp DEFAULT current_timestamp NOT NULL,
  "updated_at" timestamp
);

INSERT INTO public."user"(username, "password", email, fullname, membership, created_at)
VALUES('admin01', '$2a$12$cZndb.krfsnOvImLhcpzR.lFwkNk8SR0gL96lP//Lbkq4n4k9tpHK', 'admin01@eee.ccc', 'Admin 1', 'Premium', CURRENT_TIMESTAMP);

CREATE TABLE "category" (
  "category_id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" varchar(1000) NOT NULL,
  "activated" boolean NOT NULL,
  "created_at" timestamp DEFAULT current_timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TYPE "post_status" AS ENUM ('Draft', 'Published', 'Pending Review');
CREATE TYPE "post_label" AS ENUM ('Premium', 'Normal');

CREATE TABLE "post" (
  "post_id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  "category_id" uuid NOT NULL REFERENCES "category" ON DELETE cascade,
  "title" varchar(255) NOT NULL,
  "body" varchar(1000) NOT NULL,
  "status" post_status NOT NULL,
  "label" post_label NOT NULL,
  "created_at" timestamp DEFAULT current_timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "payment" (
  "payment_id" varchar(100) PRIMARY KEY NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "user" ON DELETE cascade,
  "amount" double precision NOT NULL,
  "payment_method" varchar(50) NOT NULL,
  "status" varchar(50) NOT NULL,
  "created_at" timestamp DEFAULT current_timestamp NOT NULL,
  "updated_at" timestamp
);
