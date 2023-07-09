-- Step 1: Retrieve the previous price value
SELECT product_price INTO @previous_price
FROM products
WHERE product_name = 'Product 1'
ORDER BY id DESC
LIMIT 1;

-- Step 2: Insert the new record with the dynamic previous price value
INSERT INTO products (product_name, product_url, product_price, product_image, previous_price)
VALUES ('Product 1', 'http://example.com/product1', 200.99, 'http://example.com/images/product1.jpg', @previous_price);
