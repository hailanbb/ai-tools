# Frontend Project Architecture Design

::: tip 🎯 Core Question
**How do you choose the right architecture for projects of different sizes, from simple HTML pages to complex enterprise applications?** It's like asking: from a studio apartment to a large shopping mall, how do you design different spatial layouts based on needs? Good architecture should evolve with the project, rather than being over-engineered from the start.
:::

---

## 1. Architecture Evolution: From Simple to Complex

### 1.1 Three Complexity Levels Overview

Frontend project architecture should match project complexity. We classify projects into three levels based on **technical complexity** and **user scale**:

| Level | Tech Stack | User Scale | Typical Scenarios | Core Focus |
|------|--------|----------|----------|------------|
| **Beginner** | HTML/CSS/JS | Individual/small team | Personal blogs, landing pages, simple tools | Quick launch, simple maintenance |
| **Intermediate** | Vue/React + build tools | Small-to-medium business | Management systems, e-commerce frontends, SaaS | Component reuse, state management |
| **Enterprise** | Framework + micro-frontend/SSR | Large applications | Large platforms, complex business systems | Performance optimization, team collaboration, scalability |

::: tip 💡 How to Choose?
**Don't over-engineer!** Many projects start with simple HTML and gradually introduce frameworks and tools as needs grow.

- Personal projects → Beginner level
- Startup MVP → Beginner or intermediate level
- Enterprise management systems → Intermediate level
- Large internet platforms → Enterprise level
:::

---

## 2. Beginner Level: HTML/CSS/JS Projects

### 2.1 Suitable Scenarios

- Personal blogs, resume pages
- Product landing pages
- Simple tool pages (calculators, converters, etc.)
- Prototype validation, quick demos

### 2.2 Recommended Directory Structure

```
my-simple-project/
├── index.html              # Homepage
├── about.html              # About page (if needed)
├── css/
│   ├── reset.css           # Reset styles
│   ├── variables.css       # CSS variables (colors, fonts, etc.)
│   ├── components.css      # Component styles (buttons, cards, etc.)
│   └── main.css            # Main stylesheet
├── js/
│   ├── utils.js            # Utility functions
│   ├── api.js              # Simple API calls
│   └── main.js             # Main logic
├── assets/
│   ├── images/             # Image assets
│   └── fonts/              # Font files
└── README.md               # Project documentation
```

### 2.3 Code Organization Principles

**HTML**: Semantic tags, clear structure

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Personal Blog</title>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <header class="site-header">
    <nav class="main-nav">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
    </nav>
  </header>

  <main class="content">
    <article class="blog-post">
      <h1>Article Title</h1>
      <p>Article content...</p>
    </article>
  </main>

  <footer class="site-footer">
    <p>&copy; 2024 My Blog</p>
  </footer>

  <script src="js/utils.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

**CSS**: Use CSS variables to manage themes

```css
/* variables.css */
:root {
  --primary-color: #3498db;
  --text-color: #333;
  --bg-color: #fff;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --font-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* components.css - Reusable component styles */
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: 4px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
}

.card {
  padding: var(--spacing-md);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

**JavaScript**: Modular organization (using ES6 modules or simple splitting)

```javascript
// utils.js
const utils = {
  // Simplified DOM operations
  $(selector) {
    return document.querySelector(selector);
  },

  // Simple debounce
  debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  // Local storage wrapper
  storage: {
    get(key) {
      return JSON.parse(localStorage.getItem(key) || 'null');
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
};

// main.js
document.addEventListener('DOMContentLoaded', () => {
  // Page initialization logic
  initNavigation();
  loadBlogPosts();
});
```

### 2.4 Best Practices

✅ **Do**:
- Use semantic HTML tags
- Use CSS variables for colors and spacing
- Compress and lazy-load images
- Add basic SEO meta tags

❌ **Avoid**:
- Inline styles (`style="..."`)
- Global variable pollution
- Duplicate code (copy-paste)

---

## 3. Intermediate Level: Vue/React Framework Projects

### 3.1 Suitable Scenarios

- Enterprise management systems (ERP, CRM, OA)
- E-commerce frontends/backends
- SaaS applications
- Web applications requiring complex interactions

### 3.2 Vue Project Recommended Structure

```
my-vue-project/
├── public/                     # Static assets
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/                 # Styles, images, fonts
│   │   ├── styles/
│   │   │   ├── variables.scss
│   │   │   ├── mixins.scss
│   │   │   └── global.scss
│   │   └── images/
│   ├── components/             # Shared components
│   │   ├── common/             # Global shared (Button, Modal, etc.)
│   │   │   ├── Button/
│   │   │   │   ├── index.vue
│   │   │   │   └── Button.scss
│   │   │   └── Modal/
│   │   └── business/           # Business components (UserCard, etc.)
│   ├── views/                  # Page components
│   │   ├── Home/
│   │   ├── User/
│   │   │   ├── List.vue
│   │   │   └── Detail.vue
│   │   └── Product/
│   ├── router/                 # Route configuration
│   │   └── index.js
│   ├── stores/                 # Pinia/Vuex state management
│   │   ├── user.js
│   │   └── app.js
│   ├── services/               # API services
│   │   ├── request.js          # axios wrapper
│   │   ├── user.js
│   │   └── product.js
│   ├── utils/                  # Utility functions
│   │   ├── format.js
│   │   ├── validate.js
│   │   └── storage.js
│   ├── composables/            # Composable functions
│   │   ├── useAuth.js
│   │   └── useLoading.js
│   ├── constants/              # Constant definitions
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── tests/                      # Test files
├── .env                        # Environment variables
├── vite.config.js
├── package.json
└── README.md
```

### 3.3 React Project Recommended Structure

```
my-react-project/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/             # Shared components
│   │   │   ├── Button/
│   │   │   │   ├── index.jsx
│   │   │   │   └── Button.module.css
│   │   │   └── Modal/
│   │   └── business/           # Business components
│   ├── pages/                  # Page components
│   │   ├── Home/
│   │   ├── User/
│   │   └── Product/
│   ├── hooks/                  # Custom Hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── services/               # API services
│   │   ├── api.js
│   │   └── userService.js
│   ├── store/                  # Redux/Zustand state management
│   │   ├── slices/
│   │   └── index.js
│   ├── utils/
│   ├── constants/
│   ├── App.jsx
│   └── main.jsx
├── tests/
└── package.json
```

### 3.4 Key Concepts Explained

#### Component Design Principles

**Single Responsibility**: One component does one thing

```vue
<!-- ❌ Bad example: Component does too much -->
<template>
  <div>
    <form @submit="handleSubmit">
      <!-- Form content -->
    </form>
    <table>
      <!-- Data table -->
    </table>
    <div class="charts">
      <!-- Charts -->
    </div>
  </div>
</template>

<!-- ✅ Good example: Split into independent components -->
<template>
  <div>
    <UserForm @submit="fetchData" />
    <UserTable :data="users" />
    <UserStats :data="users" />
  </div>
</template>
```

#### State Management Strategy

| State Type | Storage Location | Example |
|----------|----------|------|
| **Global state** | Pinia/Redux | User info, login status, theme settings |
| **Page state** | Page component | List query conditions, pagination info |
| **Component state** | Component internal | Form inputs, modal show/hide |
| **Server state** | TanStack Query/SWR | Server data, caching |

#### Directory Organization Approach Selection

**Approach 1: Organize by type (suitable for small projects)**

```
src/
├── components/     # All components
├── views/          # All pages
├── stores/         # All state
└── services/       # All services
```

**Approach 2: Organize by feature (suitable for medium-to-large projects)**

```
src/
├── features/
│   ├── auth/       # All code for authentication feature
│   ├── user/       # All code for user feature
│   └── product/    # All code for product feature
├── shared/         # Shared resources
└── App.vue
```

::: tip 💡 How to Choose?
- Project pages < 10 → Organize by type
- Project pages > 20 → Organize by feature
- Team > 5 people → Organize by feature for parallel development
:::

---

## 4. Enterprise Level: Large Application Architecture

### 4.1 Suitable Scenarios

- Large internet platforms (e-commerce, social, content platforms)
- Complex enterprise applications
- Projects requiring multi-team collaboration
- Projects with extremely high performance and maintainability requirements

### 4.2 Micro-Frontend Architecture

When a project grows to a certain size and a single codebase becomes difficult to maintain, **micro-frontend** architecture can be considered.

```
Large E-Commerce Platform/
├── Base Application (Main Framework)
│   ├── Top Navigation
│   ├── Side Menu
│   ├── User Center Entry
│   └── Sub-application Container
├── Product Sub-application (Independently deployed)
│   ├── Product List
│   ├── Product Details
│   └── Product Management
├── Order Sub-application (Independently deployed)
│   ├── Shopping Cart
│   ├── Order List
│   └── Payment Flow
├── User Sub-application (Independently deployed)
│   ├── Personal Center
│   ├── Shipping Addresses
│   └── Coupons
└── Marketing Sub-application (Independently deployed)
    ├── Campaign Pages
    ├── Coupon Distribution
    └── Points Mall
```

**Advantages of micro-frontends**:
- Team autonomy: Each sub-application develops and deploys independently
- Technology-agnostic: Different teams can use different frameworks
- Progressive upgrades: Legacy systems can be gradually refactored

### 4.3 Enterprise-Level Directory Structure

```
enterprise-project/
├── apps/                       # Micro-frontend sub-applications
│   ├── main/                   # Base application
│   ├── product/
│   ├── order/
│   └── user/
├── packages/                   # Shared packages (Monorepo)
│   ├── ui-components/          # Shared component library
│   ├── utils/                  # Utility functions
│   ├── constants/              # Constant definitions
│   └── types/                  # TypeScript types
├── shared/                     # Shared configuration
│   ├── eslint-config/
│   ├── ts-config/
│   └── vite-config/
├── docs/                       # Project documentation
├── scripts/                    # Build scripts
└── package.json
```

### 4.4 Performance Optimization Architecture

Large applications need to focus on performance optimization:

```
Performance Optimization Strategy/
├── Build-time Optimization
│   ├── Code Splitting
│   ├── Route Lazy Loading
│   ├── Tree Shaking
│   └── Asset Compression
├── Runtime Optimization
│   ├── Virtual Scrolling (long lists)
│   ├── Image Lazy Loading
│   ├── On-demand Component Rendering
│   └── Caching Strategy
└── Network Optimization
    ├── CDN Acceleration
    ├── HTTP Caching
    ├── Resource Preloading
    └── Service Worker
```

### 4.5 SSR/SSG Architecture

For scenarios requiring SEO or fast first-screen performance:

| Approach | Suitable Scenarios | Representative Frameworks |
|------|----------|----------|
| **SSR** | Needs SEO, fast first-screen rendering | Next.js, Nuxt.js |
| **SSG** | Static content, infrequent updates | Astro, VitePress |
| **Hybrid** | Part static, part dynamic | Next.js (ISR) |

---

## 5. Architecture Selection by User Scale

### 5.1 Individual/Small Team (Daily Active < 1,000)

**Characteristics**: Fast iteration, limited resources, rapidly changing requirements

**Recommended Architecture**:
- Tech stack: Vue 3 + Vite or React + Vite
- State management: Pinia or Zustand (lightweight)
- UI library: Element Plus / Ant Design
- Deployment: Vercel / Netlify / Cloud server

**Directory Structure**: Simple organization by type

### 5.2 Medium Enterprise (Daily Active 1k-100k)

**Characteristics**: Complex business, team collaboration, stability required

**Recommended Architecture**:
- Tech stack: Vue 3 + TypeScript or React + TypeScript
- State management: Pinia + composables or Redux Toolkit
- UI library: In-house component library + business component library
- Testing: Unit tests + E2E tests
- Deployment: CI/CD pipeline + Docker

**Directory Structure**: Organize by feature, establish standards

### 5.3 Large Platform (Daily Active > 100k)

**Characteristics**: High concurrency, multi-team collaboration, long-term maintenance

**Recommended Architecture**:
- Tech stack: React/Vue + TypeScript (strict mode)
- Architecture: Micro-frontend + Monorepo
- State management: Fine-grained state management + server state caching
- Performance: SSR/SSG + CDN + Edge computing
- Monitoring: Frontend monitoring + error tracking + performance analysis

**Directory Structure**: Monorepo + micro-frontend

---

## 6. Architecture Evolution Roadmap

### 6.1 Evolution Example: From Blog to Platform

```
Stage 1: Personal Blog (HTML/CSS/JS)
    ↓ Need: Backend management needed
Stage 2: Add Admin Panel (Vue/React + simple structure)
    ↓ Need: User system, comments feature
Stage 3: Feature Modularization (organize by feature)
    ↓ Need: Multi-team collaboration, independent deployment
Stage 4: Micro-frontend Architecture (Monorepo)
```

### 6.2 When Should You Upgrade Your Architecture?

| Signal | Description | Suggestion |
|------|------|------|
| Build time > 5 minutes | Project too large | Code splitting, micro-frontend |
| Frequent merge conflicts | Collaboration difficulties | Organize by feature, module splitting |
| Fix one thing, break another | Severe coupling | Refactor, strengthen testing |
| First screen load > 3 seconds | Performance issues | Lazy loading, SSR, optimization |
| Slow onboarding for new members | Disorganized structure | Documentation, standards, refactoring |

---

## 7. Summary

::: tip 💡 Core Philosophy
**There is no silver bullet for architecture — what fits is best.**

- **Small projects**: Don't over-engineer, HTML/CSS/JS is sufficient
- **Medium projects**: Establish standards, componentization, modularization
- **Large projects**: Consider micro-frontends, performance optimization, team collaboration

**Remember these points**:
1. **Progressive evolution**: Start simple, grow with needs
2. **Unified conventions**: Keep naming, structure, and code style consistent
3. **Documentation first**: Record architecture decisions for knowledge transfer
4. **Regular refactoring**: Pay off technical debt in a timely manner

**Ultimate goal**: Make code like an organized space — regardless of size, running efficiently.
:::

---

## Reference Resources

- [Vue Style Guide](https://vuejs.org/style-guide/)
- [React Project Structure Recommendations](https://react.dev/learn/thinking-in-react)
- [Bulletproof React - Architecture Guide](https://github.com/alan2207/bulletproof-react)
- [Feature Sliced Design](https://feature-sliced.design/)
- [Micro-Frontend Architecture](https://micro-frontends.org/)
