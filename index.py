from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time
import csv

csv_file = open("shop_names.csv", mode="w", newline='', encoding='utf-8')
# csv_file = open('laptop_shop.csv','w', newline='', encoding='utf-8')
csv_writer = csv.writer(csv_file)
csv_writer.writerow(['Shop Name','Link'])

chrome_options = Options()
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
chrome_options.add_argument("user-agent=Mozilla/5.0(window NT 10.0; win64; x64)")
driver = webdriver.Chrome(options=chrome_options)
driver.maximize_window()
driver.get('https://www.google.com')
time.sleep(2)

google_input = driver.find_element(By.NAME,'q')
google_input.send_keys("Laptop shop near mirpur")
google_input.send_keys(Keys.RETURN)
time.sleep(2)

maps = driver.find_element(By.CLASS_NAME,'eZt8xd')
maps.send_keys(Keys.RETURN)
try:
    height = driver.find_element(By.XPATH,'//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[1]/div[1]')
except:
    print("not find sidebar")

for s in range(60):
    height.send_keys(Keys.PAGE_DOWN)
    time.sleep(0.5)

name = driver.find_elements(By.CLASS_NAME,'qBF1Pd')
link = driver.find_elements(By.CLASS_NAME,'hfpxzc')
for n in range(100):
    try:
        shop_name = name[n].text
        print(n,shop_name)
    except:
        print("Name not found")
    try:
        shop_link = link[n].get_attribute('href')
        print(shop_link)
    except:
        print("Product link not found")
    csv_writer.writerow([shop_name,shop_link])

time.sleep(30)