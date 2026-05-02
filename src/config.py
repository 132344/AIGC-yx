import os
from datetime import datetime

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
LLM_DAILY_FILE = os.path.join(DATA_DIR, 'llm_daily_{date}.json')
NEWS_HOTSPOTS_FILE = os.path.join(DATA_DIR, 'news_hotspots_{date}.json')
COMBINED_REPORT_FILE = os.path.join(DATA_DIR, 'daily_report_{date}.md')

SCHEDULE_HOUR = 10
SCHEDULE_MINUTE = 0

LLM_SOURCES = [
    {
        'name': '36氪-大模型',
        'url': 'https://36kr.com/tag/1000000000000000001'
    },
    {
        'name': 'InfoQ-AI',
        'url': 'https://www.infoq.cn/topic/artificial-intelligence'
    }
]

NEWS_SOURCES = [
    {
        'name': '澎湃新闻-时政',
        'url': 'https://www.thepaper.cn/list_25605'
    },
    {
        'name': '新华网-时政',
        'url': 'http://www.xinhuanet.com/politics/'
    }
]
