import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from llm_daily import collect_llm_daily
from news_hotspots import collect_news_hotspots
from report_generator import generate_combined_report


def run_collection():
    print("开始收集数据...")
    
    llm_data = collect_llm_daily()
    news_data = collect_news_hotspots()
    generate_combined_report(llm_data, news_data)
    
    print("数据收集完成！")


if __name__ == "__main__":
    run_collection()
