import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 静态导出（与 fenix-sanyamed 同模式）
  // PayPal 下单走 /api/paypal/create-order：未配置密钥时自动降级 demo 模式（仅提示不支付），
  // 上线收款时改回 Workers/Pages Functions 或接入 @cloudflare/next-on-pages。
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
