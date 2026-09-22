# 🍲 Shree Balaji Home Tiffin Services — Full-Stack Food Logistics & Real-Time Order Management Platform

[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Express](https://img.shields.io/badge/Express-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Full--Stack_REST_&_SSE-orange?style=for-the-badge)](https://github.com/)

> **Live Production-Grade Full-Stack Application** built to digitize meal subscriptions, daily pure-vegetarian food delivery, and real-time order dispatch for home-cooked tiffins in Lucknow, Uttar Pradesh.

---

## 📌 Executive Summary (For HR & Technical Recruiters)

**Shree Balaji Home Tiffin Services** is an end-to-end full-stack web application designed and engineered to solve food ordering, kitchen logistics, and customer retention for local food businesses. 

### Why This Project Stands Out:
1. **Full-Stack JavaScript Architecture**: Fully converted from static templates to a decoupled, high-performance Node.js/Express backend paired with a modular React (JavaScript ES6+) frontend.
2. **Enterprise UI/UX with Bootstrap 5.3**: Clean, responsive layout adhering to WCAG accessibility, fluid mobile-first ergonomics, and custom theme tokens without heavy utility overhead.
3. **Real-Time Admin Dispatching (SSE)**: Built with native Server-Sent Events (`/api/events`) allowing kitchen administrators to receive instant order alerts and audible popups the millisecond a customer places a trial or monthly order.
4. **Anti-Ban WhatsApp Dispatch Engine**: Implements an intelligent cooldown rate limiter and Meta TOS-compliant Click-to-Chat protocol, ensuring commercial WhatsApp numbers are never flagged or banned for high-volume automated messaging.
5. **Single-Slot Role-Based Access Control (RBAC)**: Enforces an automated lock on admin registrations after the initial account is provisioned, preventing unauthorized account takeovers.
6. **Zero-Trust Data Sanitization**: All production secrets, database credentials, and sensitive customer records are strictly redacted and managed through environment variables.

---

## 📸 Product Screenshots & Visual Walkthrough

> *Screenshots capture the customer booking experience, responsive meal catalog, and the secured admin operations suite.*

| Screen | Description | Preview |
| :--- | :--- | :--- |
| **Home Page** | Warm visual hero, trust badges, pure vegetarian credentials, and rapid CTA buttons. | `assets/screenshots/HomePage.png` |
| **Weekly Menu Explorer** | Day-by-day rotational North Indian meal planner with nutritional transparency. | `assets/screenshots/WeaklyMenu.png` |
| **Instant Food Order & Trial** | 1-Click trial booking modal (₹80) with instant area delivery validation. | `assets/screenshots/FoodOrder.png` |
| **Secured Admin Portal** | Real-time live order board, status transitions, customer dialer, and SSE alerts. | `assets/screenshots/AdminPortal.png` |

```
assets/
└── screenshots/
    ├── HomePage.png          # High-converting customer landing and hero experience
    ├── WeaklyMenu.png        # Interactive daily rotating meal planner
    ├── FoodOrder.png         # Streamlined checkout with Lucknow pincode validation
    └── AdminPortal.png       # Mission-control dashboard with real-time SSE order feed
```

---

## 🏗️ System Architecture & Data Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (REACT 19 SPA)                     │
│  - Bootstrap 5.3 Responsive Grid       - Lucide-React Icons            │
│  - Trial & Subscription Modal Flows    - Area Pincode Verifier         │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │ HTTPS REST Requests             │ Real-Time SSE Stream
                   ▼                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    NODE.JS / EXPRESS BACKEND SERVER                    │
│  - POST /api/orders                - GET /api/orders                   │
│  - POST /api/whatsapp/order-dispatch (Anti-Ban Cooldown Buffer)        │
│  - GET /api/events                 - POST /api/admin/login             │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │                                 │
                   ▼                                 ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│       SUPABASE POSTGRESQL CLOUD      │  │   WHATSAPP SAFE PROTOCOL     │
│  - food_orders (Relational table)    │  │  - Meta Click-to-Chat URI    │
│  - inquiries (Contact leads)         │  │  - Rate-limited dispatcher   │
│  - admin_users (Single-Slot RBAC)    │  │  - Zero spam flag risk       │
└──────────────────────────────────────┘  └──────────────────────────────┘
```

---

## ⚙️ Core Engineering Modules

### 1. 🛡️ WhatsApp Anti-Ban & Safe Messaging Engine
Bulk messaging scripts often trigger WhatsApp spam filters and lead to permanent telephone number bans. To eliminate this risk:
- **Rate-Limiting Buffer**: Enforces a per-number cooldown interval (3,000ms) on incoming dispatch requests.
- **TOS-Compliant Click-to-Chat**: Uses client-side authenticated URL redirection (`wa.me`) with pre-sanitized payloads rather than unofficial, high-risk headless browser bots.
- **Humanized Message Templates**: Dynamically constructs clear, formatted order receipts that customer and kitchen staff can immediately verify.

### 2. ⚡ Real-Time Admin Notification Engine
- Rather than overloading the database with polling requests, the server maintains open Server-Sent Event (SSE) connections with the Admin dashboard (`/api/events`).
- When a customer submits an order, the server broadcasts an event payload containing customer info, location, and meal choices.
- The Admin Portal receives the payload instantly, updates counters, and sounds an in-browser alert banner.

### 3. 🔐 Single-Slot Master Admin Account (Security Pattern)
- Traditional multi-tenant apps allow unlimited signups. In a private cloud kitchen context, this exposes the portal to unauthorized access.
- The system checks database records on initial boot:
  - If `admin_count === 0`: Master registration slot is unlocked.
  - If `admin_count >= 1`: Registration endpoint is permanently locked down and all new signup attempts are rejected with HTTP 400.

### 4. 🗄️ Dual-Strategy Data Persistence (High Resilience)
- **Primary**: Supabase Managed PostgreSQL Database for cloud persistence.
- **Secondary / Offline Fallback**: Local JSON snapshot storage (`/data/orders.json`, `/data/inquiries.json`) ensuring that kitchen operations continue uninterrupted even during external API downtime.

---

## 📊 Database Schema (PostgreSQL / Supabase)

All sensitive keys have been sanitized. Run this script in your Supabase SQL console:

```sql
-- 1. Table for customer meal bookings (Trial & Monthly Subscriptions)
CREATE TABLE IF NOT EXISTS food_orders (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  delivery_area TEXT,
  address TEXT,
  meal_type TEXT,
  diet_preference TEXT,
  day_selected TEXT,
  menu_details TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table for client inquiries and special catering requests
CREATE TABLE IF NOT EXISTS inquiries (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  inquiry_type TEXT DEFAULT 'General',
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table for Single-Slot Master Admin Authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔒 Security & Data Sanitization Notice

In compliance with enterprise security standards:
- **No hardcoded credentials**: All database connection strings and environment keys are loaded strictly via `.env`.
- **Sensitive data masked**: In code and documentation, all live client emails, tokens, and production hashes are obfuscated.
- **Role separation**: Admin features are completely decoupled from public customer views.

```env
# .env.example (Environment Variables)
VITE_SUPABASE_URL="https://[YOUR_PROJECT_REF].supabase.co"
VITE_SUPABASE_ANON_KEY="[REDACTED_FOR_SECURITY]"
PORT=3000
```

---

## 🚀 Quickstart & Local Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Step 1: Clone the Repository
```bash
git clone https://github.com/rishabhric20-commits/shree-balaji-kitchen-website.git
cd shree-balaji-kitchen-website
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env` and provide your configuration:
```bash
cp .env.example .env
```

### Step 4: Run Development Server
```bash
npm run dev
```
The full-stack application will launch simultaneously on **`http://localhost:3000`** with Express handling API endpoints and serving the Vite React frontend.

### Step 5: Production Build
```bash
npm run build
npm start
```

---

## 🌐 Deploying to Netlify (1-Click or Git Push)

This project is pre-configured with `netlify.toml`, `public/_redirects`, and static SPA asset routing for direct, error-free deployment on [Netlify](https://www.netlify.com/):

### Method 1: Deploy via GitHub (Continuous Deployment)
1. Push your code to your GitHub repository:
   ```bash
   git push origin main
   ```
2. Go to [app.netlify.com](https://app.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
3. Select your GitHub repository (`shree-balaji-kitchen-website`).
4. Netlify will auto-detect the configuration from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. *(Optional)* Add your environment variables in Netlify Dashboard under **Site configuration > Environment variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **"Deploy site"** — Netlify will build and provide a live production URL!

### Method 2: Manual Drag & Drop Deploy
1. Run local build:
   ```bash
   npm run build
   ```
2. Go to Netlify Dashboard > **Sites** > scroll to **"Want to deploy a new site without connecting to Git?"**.
3. Drag and drop the generated **`dist`** folder directly into Netlify.
4. Your website will be live globally in seconds with full SPA URL rewrites and high-speed CDN delivery!

---

## 🔌 REST API Reference

| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Health check, server uptime, and order count metrics | Public |
| `/api/orders` | `GET` | Retrieves all food orders with status and search filters | Admin |
| `/api/orders` | `POST` | Places a new trial/subscription food order & triggers notification | Public |
| `/api/orders/:orderId/status` | `PATCH` | Updates order lifecycle (`Pending`, `Confirmed`, `Delivered`) | Admin |
| `/api/events` | `GET` | Server-Sent Events (SSE) stream for real-time order alerts | Admin |
| `/api/admin/status` | `GET` | Checks if master admin slot is available or locked | Public |
| `/api/admin/register` | `POST` | Provisions single master admin account (locks after 1 use) | Public (1-time) |
| `/api/admin/login` | `POST` | Authenticates admin session credentials | Admin |
| `/api/whatsapp/order-dispatch` | `POST` | Generates safe, rate-limited WhatsApp click-to-chat order slip | Public / Admin |

---

## 👨‍💻 Engineering Competencies Demonstrated

- **Front-End Engineering**: React 19 component lifecycle, state hooks, Bootstrap 5.3 theme customization, CSS variable systems, responsive mobile-first layouts.
- **Back-End Engineering**: Node.js, Express REST routing, Server-Sent Events (SSE), asynchronous rate-limiting queues, input validation.
- **Database & Architecture**: PostgreSQL schema modeling, Cloud Supabase integration, fallback local storage mirroring, Single-Slot RBAC design.
- **Operations & Security**: Zero-trust credential handling, environment encapsulation, defensive coding, graceful degradation.

---

## 📄 License & Intellectual Property

This project was built for **Shree Balaji Home Tiffin Services, Lucknow**. All code is open for demonstration, evaluation, and portfolio review under the [MIT License](LICENSE).
