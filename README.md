# AIGC-yx - 每日数据自动收集系统

AIGC-领主：自动化收集大模型日报和时政热点的系统

## 功能介绍

- 自动收集各大网站的大模型相关日报
- 自动收集时政热点新闻
- 每天10点定时执行
- 生成综合报告（Markdown格式）
- 数据保存为JSON格式

## 项目结构

```
/workspace
├── README.md              # 项目说明文档
├── requirements.txt       # 依赖包列表
├── src/                   # 源代码目录
│   ├── config.py          # 配置文件
│   ├── main.py            # 主程序入口
│   ├── scheduler.py       # 定时调度程序
│   ├── llm_daily.py       # 大模型日报收集模块
│   ├── news_hotspots.py   # 时政热点收集模块
│   └── report_generator.py # 报告生成模块
└── data/                  # 数据保存目录
```

## 安装使用

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 立即执行一次收集

```bash
cd /workspace/src
python main.py
```

### 3. 启动定时任务（每天10点执行）

```bash
cd /workspace/src
python scheduler.py
```

## 配置说明

在 [src/config.py](file:///workspace/src/config.py) 中可以配置：

- 数据来源网站
- 定时执行时间
- 数据保存路径

## 数据来源

### 大模型日报
- 36氪-大模型
- InfoQ-AI

### 时政热点
- 澎湃新闻-时政
- 新华网-时政

## 输出文件

收集完成后，在 `data/` 目录下会生成以下文件：

- `llm_daily_YYYYMMDD.json` - 大模型日报数据
- `news_hotspots_YYYYMMDD.json` - 时政热点数据
- `daily_report_YYYYMMDD.md` - 综合报告（Markdown格式）

## 注意事项

- 确保网络连接正常
- 部分网站可能有反爬虫机制，如遇到问题可添加代理或调整请求频率
- 如需添加新的数据来源，可在配置文件中添加并实现相应的提取逻辑

