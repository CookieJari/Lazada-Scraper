APIs:

GetProductItem-service:
/products
/products/Product 1 ==  Product%201

PostProductItem-service:
/products/

DeleteProductItem-service:
/products/items/1 + value to identify


Backend Services:
CronJobMonitorExistingProducts-service:
>> Cron Job to Call the laz price web scraper then pass the value of the product name.
>> Web scraper to return the current/update price then create an insertion into db.

LazPriceNotifier-service:
>> Create an SQL query that compares the current price from any existing prices.
    >> If current price change:
        >> Call the notifier backend.