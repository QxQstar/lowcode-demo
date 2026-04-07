# architecture-monorepo

本项目是为 [《程序员技术资产化》](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkyMzAxMzcxNQ==&action=getalbum&album_id=4400722379950096384#wechat_redirect)课程提供的一个架构清晰、可扩展、可运行的低代码引擎 MVP。它基于 **pnpm** + **Turborepo** 的 monorepo，包含 Vitis 低代码引擎（`vitis-lowcode-engine`）、类型定义、物料、渲染器与示例应用（`app`）。

## 环境要求

- **Node.js**：20.x
- **pnpm**：**9.x**

## 安装

在仓库根目录执行：

```bash
pnpm install
```

## 本地开发

根目录一键启动

```bash
pnpm dev
```

**说明：** 画布 iframe 会通过 **import map** 拉取本地构建的渲染器与物料，开发时需保证：

- **渲染器**：`http://localhost:3000/index.es.js`（`vitis-lowcode-renderer` 的 `dev` 使用 `vite preview --port 3000`）
- **物料**：`http://localhost:3001/index.es.js`（`vitis-lowcode-materials` 的 `dev` 使用 `vite preview --port 3001`）

若画布或物料加载异常，请确认上述端口未被占用，且对应包的 `dev` 已正常跑起来。

## 仓库结构（概要）

| 路径 | 说明 |
|------|------|
| `app/` | React + Vite 示例应用，依赖引擎与物料 |
| `packages/types/` | 共享类型 `vitis-lowcode-types` |
| `packages/engine/` | 低代码引擎 `vitis-lowcode-engine` |
| `packages/renderer/` | 画布内渲染 `vitis-lowcode-renderer` |
| `packages/materials/` | 物料与 meta |
| `packages/default-ext/` | 默认扩展 |
| `packages/monaco-editor/` | Monaco 相关封装 |
