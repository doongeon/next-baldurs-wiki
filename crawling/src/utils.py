from bs4 import BeautifulSoup
import requests
import json

url = "https://namu.wiki/w/%EB%B0%9C%EB%8D%94%EC%8A%A4%20%EA%B2%8C%EC%9D%B4%ED%8A%B8%203/%EC%95%84%EC%9D%B4%ED%85%9C/%EB%AC%B4%EA%B8%B0"

def writeHtmlTxt(requestURL, fileName):
  r = requests.get(requestURL)

  soup = BeautifulSoup(r.text, 'html.parser')
  html_doc = soup.prettify()

  fs = open(fileName + ".html", "w")
  fs.write(html_doc)
  fs.close()

def makeJSON():
  fs = open('./data/weaponHTML/baldursGateWeapons.html', 'r')
  doc = fs.read()
  fs.close()

  soup = BeautifulSoup(doc, 'html.parser')
  tables = soup.find_all('table')

  gameData = {"weapons" : []}

  for i in range(4, 168):
    divs = tables[i].select('td div')
    try :
      name_ko = divs[1].text.strip().split('\n')[0]
      name_en = divs[1].text.strip().split('\n')[2].strip()
      damage = divs[4].text.strip()
      weaponRange = divs[6].text.strip()
      trait = divs[8].text.strip()
      enchantment = divs[10].text.strip()
      special = divs[12].text.strip()
      weaponActions = divs[14].text.strip()
      info = divs[16].text.strip()
    except:
      print(i);
      pass

    newWeapon = {
      "name_ko": name_ko,
      "name_en": name_en,
      "damage": damage,
      "weaponRange": weaponRange,
      "trait": trait,
      "enchantment": enchantment,
      "special": special,
      "weaponActions": weaponActions,
      "info": info
    }

    gameData['weapons'].append(newWeapon)

  with open("gameData.json", "w") as fp:
    json.dump(gameData, fp, ensure_ascii = False)
    fp.close()


