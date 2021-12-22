from bs4 import BeautifulSoup
import requests

def scrape(url):
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')
    # Due to technical difficulties, we can only get the lowest price of a variant with stock, other options of the items are unavailable
    # here is where we get the price in LAZADA
    price = soup.find('span', class_="pdp-price pdp-price_type_normal pdp-price_color_orange pdp-price_size_xl")
    # here is where we get the stock in LAZADA
    stock = soup.find('span', class_="quantity-content-default")
    output = f"The price is: {price.text}! \n{stock.text}"
    print(output)