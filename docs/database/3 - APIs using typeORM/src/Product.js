const { EntitySchema } = require('typeorm');

const Product = new EntitySchema({
  name: 'Product',
  tableName: 'products',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    product_name: {
      type: 'varchar',
      length: 255,
    },
    product_url: {
      type: 'varchar',
      length: 255,
    },
    product_price: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
  },
});

module.exports = Product;
