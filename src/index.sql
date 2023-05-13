CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS carts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL,
  status varchar(10) NOT NULL CHECK (status IN ('OPEN', 'ORDERED'))
);

CREATE TABLE IF NOT EXISTS cart_items (
  cart_id uuid NOT NULL,
  product_id uuid NOT NULL,
  count integer NOT NULL,
  PRIMARY KEY (cart_id, product_id),
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE
);

INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES 
  (uuid_generate_v4(), 'd3a7a2a4-8de7-4c6b-9c61-8cd2a23d55f6', '2022-01-01', '2022-01-01', 'OPEN'),
  (uuid_generate_v4(), '5b7cf6d4-9a6e-4820-92a5-6d8cc6a2d50c', '2022-01-02', '2022-01-02', 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count)
VALUES
  ((SELECT id FROM carts WHERE user_id = 'd3a7a2a4-8de7-4c6b-9c61-8cd2a23d55f6'), uuid_generate_v4(), 2),
  ((SELECT id FROM carts WHERE user_id = 'd3a7a2a4-8de7-4c6b-9c61-8cd2a23d55f6'), uuid_generate_v4(), 1),
  ((SELECT id FROM carts WHERE user_id = '5b7cf6d4-9a6e-4820-92a5-6d8cc6a2d50c'), uuid_generate_v4(), 3),
  ((SELECT id FROM carts WHERE user_id = '5b7cf6d4-9a6e-4820-92a5-6d8cc6a2d50c'), uuid_generate_v4(), 2);