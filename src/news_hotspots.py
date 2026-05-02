import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import os
import config


def collect_news_hotspots():
    date_str = datetime.now().strftime('%Y%m%d')
    hotspots_data = {
        'date': datetime.now().isoformat(),
        'sources': [],
        'hotspots': []
    }

    for source in config.NEWS_SOURCES:
        try:
            source_data = {
                'name': source['name'],
                'url': source['url'],
                'hotspots': []
            }

            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(source['url'], headers=headers, timeout=10)
            response.encoding = 'utf-8'

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                hotspots = extract_hotspots(soup, source['name'])
                source_data['hotspots'] = hotspots
                hotspots_data['hotspots'].extend(hotspots)

            hotspots_data['sources'].append(source_data)
        except Exception as e:
            print(f"Error collecting from {source['name']}: {e}")

    save_file = config.NEWS_HOTSPOTS_FILE.format(date=date_str)
    os.makedirs(os.path.dirname(save_file), exist_ok=True)
    
    with open(save_file, 'w', encoding='utf-8') as f:
        json.dump(hotspots_data, f, ensure_ascii=False, indent=2)
    
    print(f"News hotspots saved to {save_file}")
    return hotspots_data


def extract_hotspots(soup, source_name):
    hotspots = []
    
    if '澎湃新闻' in source_name:
        items = soup.find_all('h2', class_='news_title')
        for item in items:
            title = item.get_text(strip=True)
            link_tag = item.find('a')
            link = link_tag.get('href', '') if link_tag else ''
            if link and not link.startswith('http'):
                link = 'https://www.thepaper.cn' + link
            if title:
                hotspots.append({
                    'title': title,
                    'url': link,
                    'source': source_name,
                    'timestamp': datetime.now().isoformat()
                })
    elif '新华网' in source_name:
        items = soup.find_all('li', class_='clearfix')
        for item in items:
            link_tag = item.find('a')
            if link_tag:
                title = link_tag.get_text(strip=True)
                link = link_tag.get('href', '')
                if link and not link.startswith('http'):
                    link = 'http://www.xinhuanet.com' + link
                if title:
                    hotspots.append({
                        'title': title,
                        'url': link,
                        'source': source_name,
                        'timestamp': datetime.now().isoformat()
                    })
    
    return hotspots
