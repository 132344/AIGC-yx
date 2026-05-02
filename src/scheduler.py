import sys
import os
import time
import schedule

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import config
from main import run_collection


def job():
    print("定时任务开始执行...")
    try:
        run_collection()
        print("定时任务执行完成！")
    except Exception as e:
        print(f"定时任务执行出错: {e}")


def run_scheduler():
    print(f"定时任务已启动，将在每天 {config.SCHEDULE_HOUR}:{config.SCHEDULE_MINUTE:02d} 执行")
    print("按 Ctrl+C 停止")
    
    schedule.every().day.at(f"{config.SCHEDULE_HOUR}:{config.SCHEDULE_MINUTE:02d}").do(job)
    
    try:
        while True:
            schedule.run_pending()
            time.sleep(60)
    except KeyboardInterrupt:
        print("\n定时任务已停止")


if __name__ == "__main__":
    run_scheduler()
