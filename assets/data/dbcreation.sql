CREATE TABLE "post" (
  "id_post" integer PRIMARY KEY
);

CREATE TABLE "text" (
  "id_text" uuid PRIMARY KEY,
  "content_text" text,
  "id_post" integer,
  "isFiltered" bool,
  FOREIGN KEY ("id_post") REFERENCES "post" ("id_post")
);

CREATE TABLE "image" (
  "id_image" uuid PRIMARY KEY,
  "content_image" varchar,
  "id_post" integer,
  "isFiltered" bool,
  FOREIGN KEY ("id_post") REFERENCES "post" ("id_post")
);

CREATE TABLE "video" (
  "id_video" uuid PRIMARY KEY,
  "content_video" varchar,
  "id_post" integer,
  "isFiltered" bool,
  FOREIGN KEY ("id_post") REFERENCES "post" ("id_post")
);
