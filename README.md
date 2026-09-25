# 🍯 Kitch Organic Honey — The Best Organic Honey In Kenya

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![KEBS](https://img.shields.io/badge/KEBS-KS_EAS_36%3A2018-059669?style=flat)](https://kebs.org)
[![M-Pesa Ready](https://img.shields.io/badge/Payment-M--Pesa_STK_Push-43B02A?style=flat)](https://www.safaricom.co.ke/personal/m-pesa)
[![Official Domain](https://img.shields.io/badge/Domain-kitch.co.ke-F59E0B?style=flat)](https://kitch.co.ke/)

**Kitch Organic Honey Limited** is Kenya's premier artisanal honey and sustainable apiculture e-commerce platform. Connecting indigenous forest guardians and semi-arid beekeeping cooperatives directly with households across Kenya and internationally.

🌐 **Official Website:** [https://kitch.co.ke/](https://kitch.co.ke/)  
📍 **Apiary Headquarters:** Mbagathi Ridge, Karen, Nairobi, Kenya  
📧 **Dispatch & Inquiries:** `apiary@kitch.co.ke` | 📞 `+254 722 849 192`

---

## 🌟 Key Features

### 1. 🌿 Single-Origin Terroir Catalog
- **Baringo Golden Wild Acacia (`prod-baringo-acacia`)**: Light amber, delicate floral notes from the semi-arid thornbrush conservancies of Lake Baringo.
- **Kakamega Forest Raw Canopy (`prod-kakamega-rainforest`)**: Deep dark amber, mineral-dense forest honey harvested from the fringes of Kenya's last equatorial rainforest.
- **Kitui Dryland Multifloral Wild (`prod-kitui-multifloral`)**: Sun-drenched savannah multifloral honey rich in dryland herbal nectar and natural propolis.
- **Baringo Pure Raw Chunk Comb (`prod-comb-baringo`)**: Raw virgin hexagonal beeswax comb submerged in liquid golden acacia nectar.
- **Mount Elgon Stingless Bee Medicinal (*Meliponula*) (`prod-melipona-medicinal`)**: Rare stingless bee medicinal honey prized for therapeutic polyphenol content and natural antimicrobial enzymes.

### 2. 🔬 Batch Quality & Laboratory Traceability
Every jar features a verifiable batch passport complying with **KEBS KS EAS 36:2018** raw unpasteurized standards:
- **Moisture Content**: Maintained under 18% to ensure natural shelf-stability without fermentation.
- **Hydroxymethylfurfural (HMF)**: Tested below 15 mg/kg for ultra-fresh raw harvest (well below the 40 mg/kg international limit).
- **Pollen Grain Density**: Authenticated botanical profile via melissopalynological lab analysis.
- **Community Transparency**: Explicitly lists the harvesting cooperative and lead beekeeper (e.g. *Baringo Pastoralists CBO*, *Kakamega Forest Guardians*).

### 3. 📦 The Kitch Hive Club (Recurring Subscriptions)
- **Flexible Delivery Frequencies**: Bi-weekly, monthly, bi-monthly, and quarterly cadences with free Nairobi delivery.
- **Curated Box Tiers**: *The Forager's Duo*, *The Apiary Master Box*, and *Medicinal Melipona Reserve*.
- **Member Benefits**: Kitch Loyalty Points earned on every renewal cycle, automatic renewal management, and dedicated subscription portal for pausing, rescheduling, or address updates.

### 4. 🇰🇪 Kenyan Logistics & M-Pesa STK Push
- **Lipa na M-PESA STK Push Flow**: Seamless payment experience with real-time PIN prompt simulation, callback verification, and transaction receipt generation.
- **Comprehensive Courier Coverage**:
  - **Nairobi Express**: Same-day Boda rider dispatch.
  - **Nairobi Metro & Satellites**: Kiambu, Kajiado, Machakos.
  - **Major Regional Hubs**: Mombasa, Kisumu, Nakuru, Eldoret via Fargo Courier / Wells Fargo (24–48 hrs).
  - **Upcountry & Nationwide**: Regional courier parcel offices across all 47 counties.
- **Real-Time Order Tracking**: Order reference numbers with `KTC-YYYY-XXXX` format and delivery stage timelines.

### 5. 🔐 Secure Administrator Inventory & Security Hub
- **Access Control**: Protected by administrator authentication to safeguard live apiary operations.
- **Customizable Admin Password**: Store administrators can update their security password on demand via the **Security Settings** tab.
- **Live Stock Management**: Real-time batch allocation, inventory threshold alerts, manual restocking tools, and live customer order simulation for testing and demonstrations.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/) with Fast HMR
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom font configuration (`Poppins`)
- **Icons & UI**: [Lucide React](https://lucide.dev/)
- **Motion & Interactions**: [Motion](https://motion.dev/)
- **State Management & Persistence**: React Context API (`ShopContext`) with versioned `localStorage` synchronization (`kitch_honey_v1`)
- **SEO & Structured Data**: Canonical URL (`https://kitch.co.ke/`), Schema.org JSON-LD `OnlineStore` schema, OpenGraph, Twitter Cards, `sitemap.xml`, and `robots.txt`

---

## 📂 Project Structure

```
├── public/
│   ├── kitch-logo.jpg        # Official Kitch brand emblem & favicon
│   ├── honeycomb-bg.jpg      # Background visual assets
│   ├── honeycomb-hive.jpg    # Hero banner photography
│   ├── robots.txt            # Search engine crawling rules (kitch.co.ke)
│   └── sitemap.xml           # XML sitemap for SEO indexing
├── src/
│   ├── assets/               # Sourced apiary and jar imagery
│   ├── components/
│   │   ├── CartDrawer.tsx               # Slide-over cart with live reservation timer
│   │   ├── CheckoutModal.tsx            # County logistics, Lipa na M-Pesa STK push
│   │   ├── Footer.tsx                   # Contact details, store links, accreditation
│   │   ├── Hero.tsx                     # Landing hero section with quick CTA
│   │   ├── InventoryManagerModal.tsx    # Admin dashboard with password customization
│   │   ├── KitchLogo.tsx                # Scalable brand logo component
│   │   ├── Navbar.tsx                   # Main navigation, cart counter & club links
│   │   ├── ProductCard.tsx              # Honey jar cards with stock indicators
│   │   ├── ProductDetailModal.tsx       # Batch lab metrics & tasting profiles
│   │   ├── SubscriptionBuilderModal.tsx # Subscription plan configurator
│   │   ├── SubscriptionPortalModal.tsx  # Customer recurring order management
│   │   ├── SubscriptionSection.tsx      # The Kitch Hive Club showcase
│   │   └── TraceabilitySection.tsx      # Apiary origin & KEBS certification section
│   ├── context/
│   │   └── ShopContext.tsx              # Central state: inventory, orders, auth & cart
│   ├── data/
│   │   └── honeyData.ts                 # Product database, county delivery fees & plans
│   ├── App.tsx                          # Main application layout
│   ├── index.css                        # Tailwind v4 import & custom styles
│   ├── main.tsx                         # React 19 application entry point
│   └── types.ts                         # Complete TypeScript domain interfaces
├── index.html                # App entry with canonical SEO & Schema.org JSON-LD
├── metadata.json             # AI Studio applet specifications
├── package.json              # Project scripts and dependencies
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `bun`

### 1. Clone Repository
```bash
git clone https://github.com/your-username/kitch-organic-honey.git
cd kitch-organic-honey
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to create your local `.env` if using backend or AI integration features:
```bash
cp .env.example .env
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 5. Build for Production
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

### 6. Lint & Type Check
```bash
npm run lint
```

---

## 🔒 Administrator Access & Security

Store managers can access the **Real-Time Apiary Inventory & Operations** panel:
1. Click the **"Apiary Inventory"** button in the header navigation or the lock icon in the footer.
2. Sign in with the administrator credentials.
3. Default administrator password on fresh installs: `kitch-admin-2026`
4. **Customizing the Password**:
   - Once signed in, navigate to the **"Security Settings"** tab in the modal.
   - Enter your current password and your new custom password (minimum 6 characters).
   - Click **"Update Administrator Password"**.
   - Your updated password is stored securely in persistent local configuration.

> 💡 **Production Note:** For multi-tenant or enterprise deployments, replace client-side context storage with Firebase Authentication or OAuth 2.0 with a server-side session validator.

---

## 📦 Deployment

### Deploying to Vercel
The repository includes pre-configured `vercel.json` and `.npmrc` for instant zero-config deployments on [Vercel](https://vercel.com):
1. Push your repository changes to GitHub.
2. In the Vercel Dashboard, import `Harry3342/Kitch-honey`.
3. Vercel automatically detects the Vite framework:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (peer dependency resolution handled cleanly via `.npmrc`)
4. Click **Deploy**.

### Other Hosting Platforms
The application is also ready for:
- **Cloud Run / Google Cloud**
- **Netlify** (configured via `dist` output)
- **GitHub Pages / AWS S3 + CloudFront**

Ensure your web server routes all fallback requests to `index.html` for client-side routing.

---

## 📄 License & Attribution

- Built for **Kitch Organic Honey Limited** (`kitch.co.ke`).
- Honey laboratory and quality standards follow **Kenya Bureau of Standards (KEBS) KS EAS 36:2018**.
- All rights reserved. Open source under the [MIT License](LICENSE).
