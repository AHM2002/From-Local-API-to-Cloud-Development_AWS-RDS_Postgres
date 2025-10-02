-- migrations/seed.sql

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  total DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL
);

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

-- Seed: admin user (password hashed later or use bcrypt to seed)
-- For demonstration, store a bcrypt hash of 'password123' (example). Replace with hashed value.
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@toystore.com', '$2b$10$EXAMPLEHASHREPLACE', 'admin'),
('Alice Customer', 'alice@example.com', '$2b$10$EXAMPLEHASHREPLACE', 'customer');
