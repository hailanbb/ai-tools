# 紫微斗数 · 开源排盘引擎 (ziwei-doushu)

> 🔗 **原项目 GitHub 地址**: [https://github.com/Renhuai123/ziwei-doushu](https://github.com/Renhuai123/ziwei-doushu)

基于**倪海厦《天纪》**教学体系的紫微斗数排盘系统，包含完整排盘算法、四化系统、格局知识库、古籍原文数据，以及一套完整开源的紫微斗数解读数据：**v4.0 解读数据集——67.5 万张命盘 × 13 维 = 877 万段解读，正文约 204 亿字，解压后 56.6 GB**。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导 (Doctor & Onboarding)

### 1. 前置依赖自检 (Doctor)
本工具为基于 Node.js 与 TypeScript 的 Next.js 16 Web 应用 / 排盘引擎内核。AI Agent 在初次加载或执行排盘任务前，应首先进行运行环境自检：
* **核心环境要求**：Node.js >= 18.17.0，npm >= 9.0
* **核心计算库**：`iztro`（排盘基础库）、`lunar-javascript`（农历与节气计算）
* **依赖自检与自愈命令**：
  在终端中检查 Node.js 环境：
  ```bash
  node -v
  npm -v
  ```
  * **若环境依赖缺失或未安装 Node 模块**：AI Agent 应当自动执行依赖安装：
    ```bash
    npm install
    ```

### 2. 本地回归与类型诊断自检
项目内置完整的排盘规则铁律与回归测试集，运行以下命令验证排盘引擎计算正确性：
```bash
# TypeScript 全量类型检查
npm run typecheck

# 排盘引擎回归测试（768 盘 × 紫微铁律、夏令时、立春边界、红鸾天喜、样本时辰一致性、时辰序号边界、日期合法性、同宫双四化）
npm test
```

### 3. 本地配置与凭证自愈
* **环境配置文件**：复制 `.env.example` 为 `.env.local`：
  ```bash
  cp .env.example .env.local
  ```
* **凭证要求**：
  - **排盘引擎、命盘展示、合盘起盘、格局判断**全部在本地与浏览器端运行，**不需要任何外部 API Key 或网络凭证**。
  - AI 解读（`/api/interpret`）与合盘 AI 分析（`/api/heming`）为可选扩展，仅在自行实现后端大模型接口时才需配置相关 LLM API Key。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

### 1. 核心路由机制与功能优先级
* **主要触发场景**：
  - 需要高精度排紫微斗数命盘（含真太阳时校正、1986–1991 夏令时判定、晚子时换日策略、四种闰月口径配置）。
  - 需要查询 1100+ 行紫微格局知识库（紫府同宫、日月并明、七杀朝斗等经典格局判定）。
  - 需要检索倪海厦《天纪》紫微斗数 1848 条原话语料及古籍原文（骨髓赋、紫微斗数全集、紫微斗数全书）。
  - 需要使用或检索 67.5 万张命盘 × 13 维解读数据集 v4.0（CC BY 4.0 许可）。
* **功能优先级**：
  1. `lib/ziwei/` 纯本地高精度排盘引擎与格局计算（优先推荐，零外部依赖，毫秒级响应）
  2. 离线数据集检索（51.8 万样本集 / 67.5 万 v4.0 解读数据集）
  3. Next.js 交互式 Web 排盘看板与古籍阅读器本地启动

### 2. 核心运行命令手册
* **启动本地交互界面**：
  ```bash
  npm run dev
  ```
  访问 `http://localhost:3000` 即可使用出生信息表单、命盘方格与宫位详情、本命 / 大限 / 流年切换、古籍阅读器（全文搜索）与命理百科。
* **构建生产版本**：
  ```bash
  npm run build
  npm run start
  ```

### 3. 排盘引擎内核模块结构（`lib/ziwei/`）
| 模块文件 | 作用说明 |
|---|---|
| `algorithm.ts` | 完整排盘流程：安命宫、定五行局、安十四主星、安辅星、排大限流年 |
| `constants.ts` | 天干地支、十四主星、辅星常量定义 |
| `sihua.ts` | 四化飞星系统（禄权科忌），含各天干四化对照表 |
| `patterns.ts` | **1100+ 行格局知识库**：紫府同宫、日月并明、七杀朝斗等格局判定 |
| `heming-knowledge.ts` | 合盘方法论：倪师体系下双盘比对逻辑 |
| `types.ts` | TypeScript 类型定义 |
| `cities.ts` | 全国各市县经纬度，用于真太阳时校正 |
| `famous.ts` | 历史名人命盘标准样本库 |
| `school-data.ts` / `school-tables.generated.ts` / `school-config.ts` | 星曜亮度流派对照表、闰月与晚子时口径配置 |
| `shier-shen.ts` | 十二神煞（本命按生年支起、流年层按流年支起） |
| `true-solar-time.ts` | 真太阳时校正（经度差 + 均时差，支持海外时区） |
| `dst-cn.ts` | 中国 1986–1991 夏令时年份与区间判定 |
| `clock-adjust.ts` | 钟表读数按分钟平移成标准时间（夏令时 / 当年时区不同） |
| `yunxian-context.ts` | 运限上下文（含童限处理） |
| `lunar-solar.ts` | 农历 / 公历互转与闰月边界 clamp |

### 4. 古籍原文与知识图谱
* `lib/classics/gusuifu.ts`：骨髓赋（核心歌诀）
* `lib/classics/quanji.ts`：紫微斗数全集（清代古本）
* `lib/classics/quanshu.ts`：紫微斗数全书（陈希夷传本）
* `lib/seo/`：14 主星 × 12 宫位的结构化知识数据
* `docs/tianji-ziwei/`：倪师《天纪·紫微斗数》原话 1848 条（带 B 站原视频时间戳索引）

### 5. 数据集下载与使用（可选）
* **v4.0 13 维解读数据集**（674,976 张命盘 × 13 维 = 8,774,688 段解读，解压后 56.6 GB）：
  可从原项目 Release [v4.0-13d](https://github.com/Renhuai123/ziwei-doushu/releases/tag/v4.0-13d) 按需下载年份文件：
  ```bash
  zstd -d --long=27 year-1990.jsonl.zst
  ```
* **v3.0 样本数据集**（518,400 条）：见 Release [v3.0-samples](https://github.com/Renhuai123/ziwei-doushu/releases/tag/v3.0-samples)。

### 6. 工具卸载
若需要卸载本工具，直接删除本目录即可：
```bash
rm -rf tools/entertainment-lifestyle/ziwei-doushu
```

---

## 📄 许可协议说明
* **代码**（`lib/`、`app/`、`components/`）：[MIT License](./LICENSE)
* **数据集**（51.8 万样本数据集 v3.0、13 维解读数据集 v4.0）：[CC BY 4.0](./DATASET-LICENSE)（允许商用，需注明来源与作者）
* **古籍原文**：Public Domain（公有领域）
* **倪师原话**（`docs/tianji-ziwei/`）：[CC BY-NC-SA 4.0](./docs/tianji-ziwei/LICENSE.md)（仅限非商业研究）
