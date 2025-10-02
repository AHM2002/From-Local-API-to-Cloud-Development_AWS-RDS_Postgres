-- migrations/seed.sql
SET client_min_messages = warning;

-- USERS table
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL DEFAULT 'Guest User',
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
select * from users;

-- CATEGORIES table
DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT DEFAULT 'General category',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- PRODUCTS table
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL DEFAULT 'New Product',
  description TEXT DEFAULT 'No description available',
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock INTEGER DEFAULT 0,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- ORDERS table
DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  total DECIMAL(10,2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- ORDER_ITEMS table
DROP TABLE IF EXISTS order_items CASCADE;
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

------------------------------------------------------------
-- SEED DATA
------------------------------------------------------------

-- Seed: categories
INSERT INTO categories (name, description) VALUES
('Action Figures', 'Action figures and collectibles'),
('Board Games', 'Board and tabletop games for families'),
('Educational', 'STEM and learning toys');

-- Seed: products
INSERT INTO products (name, description, price, stock, category_id) VALUES
('Superhero Figure', '12-inch action figure', 24.99, 10, 1),
('Galaxy Board Game', 'Strategy board game for 2-6 players', 39.99, 5, 2),
('Kids Science Kit', 'Learn basic chemistry safely', 19.50, 15, 3);

-- Seed: users (bcrypt hashes should be generated via Node.js + bcrypt)
-- Replace $2b$10$EXAMPLEHASHREPLACE with real bcrypt hash of 'password123'
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@toystore.com', '$2b$10$EXAMPLEHASHREPLACE', 'admin'),
('Alice Customer', 'alice@example.com', '$2b$10$EXAMPLEHASHREPLACE', 'customer');

-- Seed: orders
INSERT INTO orders (user_id, total, status) VALUES
(2, 64.98, 'completed'), -- Alice ordered something
(2, 19.50, 'pending');   -- Alice has one pending order

-- Seed: order_items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 49.98), -- 2 Superhero Figures
(1, 2, 1, 39.99), -- 1 Galaxy Board Game
(2, 3, 1, 19.50); -- 1 Kids Science Kit
