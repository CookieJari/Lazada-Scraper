INSERT INTO products (product_name, product_url, product_price, product_image) VALUES
  ('Product 1', 'http://example.com/product1', 10.99, 'http://example.com/images/product1.jpg'),
  ('Product 2', 'http://example.com/product2', 19.99, 'http://example.com/images/product2.jpg'),
  ('Product 3', 'http://example.com/product3', 7.99, 'http://example.com/images/product3.jpg'),
  ('Product 4', 'http://example.com/product4', 14.99, 'http://example.com/images/product4.jpg'),
  ('Product 5', 'http://example.com/product5', 5.99, 'http://example.com/images/product5.jpg'),
  ('Product 6', 'http://example.com/product6', 12.99, 'http://example.com/images/product6.jpg'),
  ('Product 7', 'http://example.com/product7', 8.99, 'http://example.com/images/product7.jpg'),
  ('Product 8', 'http://example.com/product8', 17.99, 'http://example.com/images/product8.jpg'),
  ('Product 9', 'http://example.com/product9', 9.99, 'http://example.com/images/product9.jpg'),
  ('Product 10', 'http://example.com/product10', 11.99, 'http://example.com/images/product10.jpg');

INSERT INTO products (product_name, product_url, product_price, product_image) VALUES
  ('Product 1', 'http://example.com/product1', 13.99, 'http://example.com/images/product1.jpg'),
  ('Product 2', 'http://example.com/product2', 21.99, 'http://example.com/images/product2.jpg'),
  ('Product 3', 'http://example.com/product3', 9.99, 'http://example.com/images/product3.jpg'),
  ('Product 4', 'http://example.com/product4', 16.99, 'http://example.com/images/product4.jpg'),
  ('Product 5', 'http://example.com/product5', 7.49, 'http://example.com/images/product5.jpg'),
  ('Product 6', 'http://example.com/product6', 14.49, 'http://example.com/images/product6.jpg'),
  ('Product 7', 'http://example.com/product7', 11.99, 'http://example.com/images/product7.jpg'),
  ('Product 8', 'http://example.com/product8', 19.99, 'http://example.com/images/product8.jpg'),
  ('Product 9', 'http://example.com/product9', 12.99, 'http://example.com/images/product9.jpg'),
  ('Product 10', 'http://example.com/product10', 15.99, 'http://example.com/images/product10.jpg');

INSERT INTO products (product_name, product_url, product_price, product_image) VALUES
  ('Product 2', 'http://example.com/product2', 21.99, 'http://example.com/images/product2.jpg'),
  ('Product 4', 'http://example.com/product4', 16.99, 'http://example.com/images/product4.jpg'),
  ('Product 6', 'http://example.com/product6', 14.49, 'http://example.com/images/product6.jpg'),
  ('Product 8', 'http://example.com/product8', 19.99, 'http://example.com/images/product8.jpg'),
  ('Product 10', 'http://example.com/product10', 15.99, 'http://example.com/images/product10.jpg'),
  ('Product 2', 'http://example.com/product2', 23.99, 'http://example.com/images/product2.jpg'),
  ('Product 4', 'http://example.com/product4', 18.99, 'http://example.com/images/product4.jpg'),
  ('Product 6', 'http://example.com/product6', 10.99, 'http://example.com/images/product6.jpg'),
  ('Product 8', 'http://example.com/product8', 20.99, 'http://example.com/images/product8.jpg'),
  ('Product 10', 'http://example.com/product10', 14.49, 'http://example.com/images/product10.jpg');


-- Add Dynamic Values
INSERT INTO products (product_name, product_url, product_price, product_image) VALUES
  ('Product 1', 'http://example.com/product1', 10.99, 'http://example.com/images/product1.jpg');

-- Step 1: Retrieve the previous price value
SELECT product_price INTO @previous_price
FROM products
WHERE product_url = 'http://example.com/product1'
ORDER BY id DESC
LIMIT 1;

-- Step 2: Insert the new record with the dynamic previous price value
INSERT INTO products (product_name, product_url, product_price, product_image, previous_price)
VALUES ('Product 1', 'http://example.com/product1', 200.99, 'http://example.com/images/product1.jpg', @previous_price);

-- select the previouse price where key is product_url order by id desc to get one value to insert in previous/
INSERT INTO products (product_name, product_url, product_price, product_image, previous_price)
VALUES ('Product 1', 'http://example.com/product1', 200.99, 'http://example.com/images/product1.jpg', 
  (SELECT product_price FROM (
    SELECT product_price FROM products WHERE product_url = 'http://example.com/product1' ORDER BY id DESC LIMIT 1
  ) AS subquery)
);
