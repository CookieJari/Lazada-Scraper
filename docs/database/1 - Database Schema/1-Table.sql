CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  product_url VARCHAR(255) NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  date_inserted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);