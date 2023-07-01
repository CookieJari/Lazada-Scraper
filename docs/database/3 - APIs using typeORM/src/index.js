// src/index.js
require('reflect-metadata');
const { createConnection } = require('typeorm');
const express = require('express');
const Product = require('./Product');

const app = express();
const port = 3000;

createConnection({
  type: 'mysql',
  host: '172.23.0.2',
  port: 3306,
  username: 'root',
  password: 'mysecretpassword',
  database: 'lazprice_dev',
  entities: [Product],
  synchronize: true,
})
  .then(async (connection)  => {
    console.log('Database connection established');

    const productRepository = connection.getRepository(Product);

// GetProductItem-service / all
app.get('/products', async (req, res) => {
  const uniqueProductNames = await productRepository
    .createQueryBuilder('product')
    .select('DISTINCT product.product_name', 'product_name')
    .getRawMany();

  res.json(uniqueProductNames);
});

// GetProductItem-service / by product name
app.get('/products/:productName', async (req, res) => {
  const productName = req.params.productName;

  const products = await productRepository.find({
    where: {
      product_name: productName,
    },
    select: ["product_name", "product_url", "product_price"],
  });

  if (products.length === 0) {
    return res.status(404).json({ error: 'No products found with the specified name' });
  }

  res.json(products);
});


    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
