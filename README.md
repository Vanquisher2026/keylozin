# KEYLOZIN - Family Matching Apparel Store

> ### ⚡ 速查卡（2026-11-12）
>
> | | |
> |---|---|
> | **域名** | `keylozin.com` + `www` |
> | **托管** | Cloudflare Pages（`pages_build_output_dir = ".next"`） |
> | **部署** | GitHub Actions `.github/workflows/deploy.yml` → `npm ci` → `npm run build` → wrangler v3 |
> | **仓库** | ⚠️ **`github.com/caiguofei-ops/keylozin`**（**不同 GitHub 账号**，非 Vanquisher2026） |
> | **最近提交** | **2026-06-28**（已 4.5 个月未动） |
> | **Cloudflare 账号** | ⚠️ **不在当前 CF 账号**（`654a98d7bc` 下只有 fenix / ym-proxy / czevip 三个 Pages 项目）→ 本站属于**另一套 CF 账号** |
>
> **⚠️ 本站部署需要 GitHub Secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`，属于另一套账号凭证，不在 `D:\Claw\ru-medical\ops\cdp\cf.env` 里。**
>
> **总控台（4 个站全貌）→ `D:\Claw\docs\网站总控台.md`**
>
> **待你决定**：本站归属与主营站不同（不同 GitHub + 不同 CF 账号），是否仍算在你的站点清单里？

---

A modern e-commerce website for KEYLOZIN, a family-themed apparel brand specializing in matching outfits for fathers, couples, siblings, and families.

![KEYLOZIN](https://img.shields.io/badge/KEYLOZIN-Family%20Matching-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-orange?style=for-the-badge&logo=cloudflare)

## Features

- 🛍️ **Full E-commerce Functionality** - Product browsing, cart, checkout
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Vibrant, family-friendly design
- 🚀 **Fast Performance** - Built with Next.js 14
- ☁️ **Cloudflare Deployment** - Global CDN distribution
- 🔄 **CI/CD Pipeline** - Automatic deployments via GitHub Actions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/keylozin.git
cd keylozin

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Cloudflare Pages

1. Push your code to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Create a new Pages project
4. Connect your GitHub repository
5. Set build command: `npm run build`
6. Set output directory: `.next`
7. Add environment variables if needed

### Required Secrets

Configure these in your GitHub repository settings:

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare Account ID
- `NEXT_PUBLIC_SITE_URL` - Your site URL

## Project Structure

```
keylozin/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── products/         # Products pages
│   │   ├── cart/             # Shopping cart
│   │   ├── checkout/        # Checkout flow
│   │   └── about/           # About page
│   ├── components/          # React components
│   └── lib/
│       ├── products.ts      # Product data
│       └── cart-context.tsx # Cart state management
├── public/                  # Static assets
├── wrangler.toml           # Cloudflare config
└── .github/workflows/     # CI/CD pipeline
```

## Pages

- `/` - Homepage with hero, categories, featured products
- `/products` - Product listing with filters
- `/products/[slug]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/about` - About KEYLOZIN

## License

MIT License - see LICENSE file for details
