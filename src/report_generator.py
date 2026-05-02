from datetime import datetime
import os
import config


def generate_combined_report(llm_data, news_data):
    date_str = datetime.now().strftime('%Y%m%d')
    date_display = datetime.now().strftime('%Y年%m月%d日')
    
    report = f"# 每日综合报告 - {date_display}\n\n"
    report += "---\n\n"
    
    report += "## 一、大模型日报\n\n"
    for source in llm_data['sources']:
        report += f"### {source['name']}\n"
        for idx, article in enumerate(source['articles'][:10], 1):
            report += f"{idx}. [{article['title']}]({article['url']})\n"
        report += "\n"
    
    report += "---\n\n"
    report += "## 二、时政热点\n\n"
    for source in news_data['sources']:
        report += f"### {source['name']}\n"
        for idx, hotspot in enumerate(source['hotspots'][:10], 1):
            report += f"{idx}. [{hotspot['title']}]({hotspot['url']})\n"
        report += "\n"
    
    report += "---\n\n"
    report += f"*报告生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n"
    
    save_file = config.COMBINED_REPORT_FILE.format(date=date_str)
    os.makedirs(os.path.dirname(save_file), exist_ok=True)
    
    with open(save_file, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"Combined report saved to {save_file}")
    return report
