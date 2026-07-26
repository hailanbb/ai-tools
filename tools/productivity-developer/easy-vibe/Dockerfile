# ============================================================
# Easy-Vibe 魔搭创空间 (ModelScope Studio) 部署镜像
# 使用多阶段构建：先编译 VitePress 静态站点，再用 Nginx 提供服务
# 魔搭要求服务端口为 7860，通过 nginx.conf 配置监听
# ============================================================

# ---- 构建阶段：Node.js 编译 VitePress 文档站 ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# ---- 运行阶段：Nginx 提供静态文件服务 ----
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html

EXPOSE 7860

CMD ["nginx", "-g", "daemon off;"]
