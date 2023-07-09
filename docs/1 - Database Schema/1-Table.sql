
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  product_url VARCHAR(255) NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  product_image VARCHAR(255),
  previous_price DECIMAL(10, 2),
  date_inserted TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6)
);
