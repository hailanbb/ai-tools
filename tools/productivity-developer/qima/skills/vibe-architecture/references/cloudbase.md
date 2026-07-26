# CloudBase 平台能力(vibe-architecture reference)

> 本文件被 `SKILL.md` 的「技术栈铁律基线」「后端架构方法论」与 `architecture.md` 第 2 章「CloudBase 资源清单」引用,是这些处的细节背书。

## 平台能力总览

腾讯云开发 **CloudBase = AI-Native 全栈 Serverless**,是本套件的**唯一后端平台**。它把数据库、计算、托管、身份认证、云存储、AI 能力统一在一个 Serverless 平台里,无传统常驻服务进程。`vibe-implement` 阶段通过 **CloudBase MCP** 直接落地这些资源,无需手工控制台操作。

## 数据库

- **两种类型**:**关系型(PostgreSQL)** 或 **文档型**,二选一(在 `architecture.md` 项目级决策已定)。
- **共同能力**:实时订阅(IM/协作/状态看板/行情类用)、备份恢复(发布前安全网)、**行级安全规则(security rules)做权限**——SDK 直连的数据必须由 security rules 兜底。
- 字段范式、ERD、索引、security rules 编写范式详见 `references/db.md`。

## 云函数(Cloud Functions)

- serverless 函数,**HTTP / 事件触发**,多语言。
- 承载**重业务逻辑 / 敏感写入(扣款/改状态)/ 跨集合事务校验 / 定时与事件触发 / agent 后端**。是「不能信任客户端」逻辑的归口。

## 云托管(CloudBase Run)

- **容器托管**,自动扩缩、灰度发布。
- **Next.js SSR 即跑在云托管容器**;需长跑 / 常驻 / 大依赖的 **agent 后端容器**也跑在此。

## 静态托管

- 一键前端部署、自动 HTTPS、全球 CDN、History 路由、版本回滚。
- 适合**纯静态 / SSG** 形态。

## 身份认证

- 邮箱 / 手机号 / OAuth / 微信登录 等多种方式。
- 配合**行级访问控制**(与 security rules 协同)。
- 选型依据:国内 C 端 → 手机号/微信;海外/通用 → 邮箱/OAuth;多租户/数据隔离 → 重点设计行级安全规则。

## 云存储

- 文件上传 / 管理 / 分发、图片处理、CDN。
- 基于身份的访问控制。

## AI 能力

- 统一大模型接入 + Agent 开发能力。

## SDK 矩阵

| SDK | 适用端 |
|-----|--------|
| `@cloudbase/js-sdk` | Web(浏览器,前端 SDK 直连) |
| Node.js SDK | 服务端 / 云函数 |
| Flutter SDK | Flutter App |
| 小程序 SDK | 微信小程序 |
| HTTP API | 任意 HTTP 客户端 |

## CloudBase MCP(`@cloudbase/cloudbase-mcp`,亦称 CloudBase AI ToolKit)

CloudBase MCP 让 `vibe-implement` 阶段经 MCP 直接**建库 / 部署 / 配置 CDN / 域名**,无需手工控制台操作。两种接入方式:

### 接入一:本地 npx

```
npx @cloudbase/cloudbase-mcp
```

从环境变量读取凭据:

| 变量 | 含义 |
|------|------|
| `TENCENTCLOUD_SECRETID` | 腾讯云 SecretId |
| `TENCENTCLOUD_SECRETKEY` | 腾讯云 SecretKey |
| `CLOUDBASE_ENV_ID` | CloudBase 环境 ID |

真实值不入库,`.env.example` 入库。

### 接入二:托管 HTTP

- 端点:`https://tcb-api.cloud.tencent.com/mcp/v1`
- SecretId / SecretKey 放在请求 header 中。

`architecture.md` 第 6.4 节须标明本项目采用哪种接入方式及凭据来源。

## CloudBase 资源 → 本套件映射速记表

| 资源 | 形态 | 在本套件中的用途 |
|------|------|------------------|
| 数据库 | PostgreSQL 关系型 / 文档型 | 数据存储(均支持实时订阅、备份恢复、行级安全规则) |
| 计算 · 云函数 | serverless,HTTP/事件触发 | 重业务、敏感写入、事务、定时触发、agent 后端 |
| 计算 · 云托管 CloudBase Run | 容器托管,自动扩缩、灰度 | 承载 Next.js SSR;承载长跑 agent 容器 |
| 静态托管 | 一键部署 + HTTPS + CDN + History 路由 + 版本回滚 | 纯静态 / SSG 形态 |
| 身份认证 | 邮箱/手机号/OAuth/微信 + 行级访问控制 | 登录与门控 |
| 云存储 | 文件/图片 + CDN + 基于身份访问控制 | 文件上传/分发 |
| AI 能力 | 统一大模型接入 + Agent 开发能力 | LLM/agent 产品 |
| SDK | `@cloudbase/js-sdk` / Node.js / Flutter / 小程序 / HTTP API | 各端接入 |
