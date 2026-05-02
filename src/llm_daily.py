import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import os
import config


def collect_llm_daily():
    date_str = datetime.now().strftime('%Y%m%d')
    daily_data = {
        'date': datetime.now().isoformat(),
        'sources': [],
        'articles': []
    }

    for source in config.LLM_SOURCES:
        try:
            source_data = {
                'name': source['name'],
                'url': source['url'],
                'articles': []
            }

            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(source['url'], headers=headers, timeout=10)
            response.encoding = 'utf-8'

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                articles = extract_articles(soup, source['name'])
                source_data['articles'] = articles
                daily_data['articles'].extend(articles)

            daily_data['sources'].append(source_data)
        except Exception as e:
            print(f"Error collecting from {source['name']}: {e}")

    save_file = config.LLM_DAILY_FILE.format(date=date_str)
    os.makedirs(os.path.dirname(save_file), exist_ok=True)
    
    with open(save_file, 'w', encoding='utf-8') as f:
        json.dump(daily_data, f, ensure_ascii=False, indent=2)
    
    print(f"LLM daily data saved to {save_file}")
    return daily_data


def extract_articles(soup, source_name):
    articles = []
    
    if '36氪' in source_name:
        items = soup.find_all('a', class_='kr-article-title')
        for item in items:
            title = item.get_text(strip=True)
            link = item.get('href', '')
            if link and not link.startswith('http'):
                link = 'https://36kr.com' + link
            if title:
                articles.append({
                    'title': title,
                    'url': link,
                    'source': source_name,
                    'timestamp': datetime.now().isoformat()
                })
    elif 'InfoQ' in source_name:
        items = soup.find_all('h3', class_='com__title')
        for item in items:
            title = item.get_text(strip=True)
            link_tag = item.find('a')
            link = link_tag.get('href', '') if link_tag else ''
            if link and not link.startswith('http'):
                link = 'https://www.infoq.cn' + link
            if title:
                articles.append({
                    'title': title,
                    'url': link,
                    'source': source_name,
                    'timestamp': datetime.now().isoformat()
                })
    
    return articles
