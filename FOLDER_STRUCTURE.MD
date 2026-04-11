# WizHub Frontend — Folder Structure

## Overview

WizHub menggunakan arsitektur **Module-Based** di mana setiap business domain (core, finance, rental, property, dll) diorganisir dalam module terpisah. Pendekatan ini memastikan codebase tetap maintainable seiring bertambahnya fitur.

## Struktur Direktori

```
src/
├── modules/                        # Business modules
│   ├── auth/                       # Module: Auth (sign-in, sign-up, dll)
│   │   ├── features/
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx
│   │   │   ├── sign-up/
│   │   │   │   └── page.tsx
│   │   │   ├── password-reset/
│   │   │   ├── password-new/
│   │   │   ├── get-verification/
│   │   │   ├── set-verification/
│   │   │   ├── terms-and-conditions/
│   │   │   ├── privacy-policy/
│   │   │   └── landing/            # Landing page (redirect)
│   │   └── layout.tsx              # Auth layout wrapper
│   │
│   ├── core/                       # Module: Core (dashboard, settings)
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   └── menu.ts                 # Menu items + component loaders
│   │
│   └── finance/                    # Module: Finance
│       ├── features/
│       │   └── dashboard/
│       │       └── page.tsx
│       ├── components/             # Shared components within finance
│       ├── hooks/                  # Shared hooks within finance
│       ├── services/               # API services within finance
│       ├── types/                  # Types within finance
│       └── menu.ts                 # Menu items + component loaders
│
├── shared/                         # Shared across ALL modules
│   ├── components/                 # Reusable UI components
│   │   ├── layout/                 # App layout, header, menu, containers
│   │   ├── charts/                 # Chart components & tooltips
│   │   ├── data-grid/              # DataGrid components
│   │   ├── logo/                   # Logo component
│   │   ├── plugins/                # Third-party plugin wrappers
│   │   ├── loading.tsx             # Loading spinner
│   │   └── not-found.tsx           # 404 page
│   ├── hooks/                      # Shared hooks (use-menu, use-screen, dll)
│   ├── services/                   # API client, auth service
│   ├── types/                      # Common types (MenuItem, auth types, dll)
│   ├── contexts/                   # Global contexts (AuthContext)
│   ├── utils/                      # Utility functions (cn, isPathMatch, chart helpers)
│   ├── config.ts                   # App defaults (theme, menu, etc.)
│   └── constants.ts                # Constants (storage keys, theme options)
│
├── icons/                          # Icon components
│   ├── nexture/                    # Nexture icon set (Ni* naming)
│   ├── form/                       # Form icons (checkbox, radio)
│   └── illustrations/              # Illustration SVGs
│
├── theme/                          # MUI theme provider & extensions
├── style/                          # CSS overrides (per MUI category)
├── i18n/                           # Internationalization (5 locales)
│
├── menu-items.ts                   # Aggregates menu.ts dari semua modules
├── routes.tsx                      # Generates routes dari menu-items + auth
├── App.tsx                         # Root component & provider hierarchy
└── main.tsx                        # Entry point
```

## Prinsip Arsitektur

### 1. Module = Business Domain

Setiap module merepresentasikan satu business domain yang memiliki:
- **features/** — halaman-halaman (page components) beserta components, hooks, dan types yang spesifik untuk feature tersebut
- **menu.ts** — definisi menu sidebar + lazy component loaders untuk module ini
- **components/, hooks/, services/, types/** (opsional) — code yang di-share antar feature dalam module yang sama

### 2. Colocation (Code Dekat dengan Penggunanya)

```
modules/finance/features/invoices/
├── page.tsx                # Page component
├── components/             # Components khusus feature ini
│   ├── invoice-table.tsx
│   └── invoice-form.tsx
├── hooks/                  # Hooks khusus feature ini
│   └── use-invoice-filter.ts
├── services/               # API calls khusus feature ini
│   └── invoice.service.ts
└── types.ts                # Types khusus feature ini
```

### 3. Three-Level Scope

Code dimulai dari scope paling spesifik dan naik ke atas hanya jika benar-benar reusable:

| Level | Lokasi | Kapan digunakan |
|-------|--------|-----------------|
| Feature | `modules/{module}/features/{feature}/` | Hanya dipakai 1 feature |
| Module | `modules/{module}/components/` dll | Dipakai 2+ feature dalam module yang sama |
| Shared | `shared/` | Dipakai lintas module |

### 4. Direct Module Routing (No `pages/` Layer)

Routes dihasilkan langsung dari `menu.ts` setiap module — **tidak ada `pages/` directory**. Setiap menu item yang punya `component` field akan otomatis menjadi route:

```ts
// src/modules/finance/menu.ts
export const financeMenuItems: MenuItem = {
  id: "finance",
  icon: "NiReceipt",
  label: "menu-finance",
  href: "/finance",
  children: [
    {
      id: "finance-dashboard",
      label: "Dashboard",
      href: "/finance/dashboard",
      icon: "NiChartPie",
      component: () => import("@/modules/finance/features/dashboard/page"),
    },
  ],
};
```

`routes.tsx` secara recursive membaca semua menu items dan membuat `<Route>` dari field `component`.

### 5. Aggregated Menus

Setiap module mendefinisikan menu items sendiri, lalu di-aggregate di root:

```ts
// src/menu-items.ts
import { coreMenuItems } from "@/modules/core/menu";
import { financeMenuItems } from "@/modules/finance/menu";

export const leftMenuItems: MenuItem[] = [...coreMenuItems, financeMenuItems];
```

## Cara Menambah Module Baru

### 1. Buat folder module

```bash
mkdir -p src/modules/{nama-module}/features/dashboard
```

### 2. Buat feature page

```tsx
// src/modules/{nama-module}/features/dashboard/page.tsx
export default function NamaModuleDashboard() {
  return <div>Dashboard</div>;
}
```

### 3. Buat menu.ts dengan component loader

```ts
// src/modules/{nama-module}/menu.ts
import { MenuItem } from "@/shared/types/types";

export const namaModuleMenuItems: MenuItem = {
  id: "nama-module",
  icon: "NiBuilding",
  label: "menu-nama-module",
  href: "/nama-module",
  children: [
    {
      id: "nama-module-dashboard",
      label: "Dashboard",
      href: "/nama-module/dashboard",
      icon: "NiChartPie",
      component: () => import("@/modules/{nama-module}/features/dashboard/page"),
    },
  ],
};
```

### 4. Register di menu-items.ts

```ts
// src/menu-items.ts
import { namaModuleMenuItems } from "@/modules/{nama-module}/menu";

export const leftMenuItems: MenuItem[] = [
  ...coreMenuItems,
  financeMenuItems,
  namaModuleMenuItems,  // tambahkan di sini
];
```

Done. Hanya 3 langkah — buat feature, buat menu.ts, register.

## Import Convention

```ts
// Import dari shared
import { cn } from "@/shared/utils";
import { MenuItem } from "@/shared/types/types";
import { DEFAULTS } from "@/shared/config";
import { useAuth } from "@/shared/contexts/auth-context";
import { apiClient } from "@/shared/services/api";

// Import dari module (jika memang perlu cross-module)
import { SomeComponent } from "@/modules/finance/components/some-component";
```
