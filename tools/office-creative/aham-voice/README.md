# Aham Voice - 本地离线录音转写与 AI 会议纪要工具 (macOS)

Aham Voice 是一款专为 macOS 设计的本地优先、隐私安全的录音转写与 AI 会议纪要生成应用。通过在本地离线集成 FunASR 转写、CAM++ 说话人分离及 emotion2vec 声学情绪感知，实现数据与音频全程保留在本地，仅将生成的稿件通过用户自配的 OpenAI 兼容 LLM 接口整理为结构化会议纪要。

---

## 🛠️ 第一阶段：环境自检与初始化 (Doctor & Onboarding)

在运行 Aham Voice 应用或进行本地部署前，必须进行前置环境与模型自检：

### 1. macOS 系统与模型分卷自检
* **系统要求**：支持 Apple Silicon 架构的 macOS 系统。
* **分卷 DMG 合并与挂载**：
  若从 GitHub Release 下载了分卷压缩文件，运行以下命令合并后安装：
  ```bash
  cat AhamVoice-*.dmg.* > "Aham Voice.dmg"
  ```
* **macOS 隔离属性清除**：
  ```bash
  xattr -dr com.apple.quarantine /Applications/AhamVoice.app
  ```

### 2. LLM Key 与离线模型检测
* 在应用“设置”中配置 OpenAI 兼容的 API Key 与 Base URL（Key 仅存储于本地）。
* 自检本地 FunASR (paraformer+VAD) 和 CAM++ 声纹模型加载状态。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

Aham Voice 采用一体成稿的本地音视频处理管线：

### 1. 核心处理流程
1. **音频录制/导入**：导入本地录音文件或开启实时话筒录音。
2. **离线转写与说话人分离**：通过本地 FunASR 离线转写为文本，并使用 CAM++ 声纹自动识别不同说话人。
3. **声学情绪感知**：使用 emotion2vec 进行声学语调与情绪状态标记。
4. **AI 纪要生成**：调用配置的大模型一键提炼会议要点、待办事项与自然语言重写。

### 2. 应用场景
* **保密会议与企业内部讨论**：音频文件绝对不离开本机，满足高安全隐私诉求。
* **多发言人研讨会/采访**：自动区分发言人声纹并匹配转写稿。

---

## 📂 技能目录结构

```text
tools/office-creative/aham-voice/
├── README.md                           # 本重塑说明文档
├── DEPLOY.md                           # 部署与编译指引
├── DEV_LOCAL.md                        # 本地开发说明
├── frontend-src/                       # 前端源码
├── backend/                            # 后端核心与模型加载逻辑
├── packaging/                          # DMG 打包脚本
└── assets/                             # 预览图与交互资产
```
