前端使用 **Vue 3 + TypeScript + Vite**，後端使用 **Hono + Cloudflare Workers**。  
專案目的是生成隨機「土味情話」或創意情話，並提供 API 接口給前端使用。

## 功能特色

-   **隨機情話 API**：提供 JSON 格式的土味或創意情話
-   **伺服器渲染**：Hono 在 Cloudflare Workers 上運行，可直接返回 HTML 或 JSON
-   **Rate Limiter**：限制每個 IP 的請求頻率，防止濫用

MIT License
