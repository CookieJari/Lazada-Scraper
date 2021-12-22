from bs4 import BeautifulSoup
import requests

import Scraper

urlazada = "https://www.lazada.com.ph/products/oculus-quest-2-advanced-all-in-one-128gb-256gb-virtual-reality-headset-quest2-vr-i1555102839-s10610980280.html"
urlazadastock = "https://www.lazada.com.ph/products/amd-ryzen-9-5950x-34-ghz-16-core-am4-processor-with-asus-rog-crosshair-viii-dark-hero-am4-amd-x570-sata-6gbs-atx-amd-motherboard-i1924835641-s8232829589.html"
urlshopee = "https://shopee.ph/Personalized-Customized-Bead-Name-Bracelet-i.434214.5379243457"

Scraper.scrape(urlazada)