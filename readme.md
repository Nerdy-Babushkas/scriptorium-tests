# 🎭 Scriptorium — E2E Test Suite

![Playwright](https://img.shields.io/badge/Playwright-1.52-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

An end-to-end test suite for [Scriptorium](https://scriptorium-frontend.vercel.app) — a full-stack media tracking platform. Built with **Playwright** and the **Page Object Model (POM)** design pattern, covering four core user flows across the application.

> 💡 During development, this suite caught a real bug — the search page was reading media type from `localStorage` instead of the URL parameter, causing searches to silently run against the wrong media type.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Test Coverage](#-test-coverage)
- [Getting Started](#-getting-started)
- [Running Tests](#-running-tests)
- [Configuration](#-configuration)
- [Author](#-author)

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| **Playwright 1.52** | Browser automation and test runner |
| **JavaScript (ES6)** | Test logic and page objects |
| **Node.js** | Runtime environment |
| **Chromium** | Primary test browser |

---

## 📁 Project Structure

```
scriptorium-tests/
│
├── fixtures/
│   └── auth.fixture.js         # Shared logged-in state across test suites
│
├── pages/                      # Page Object Model — one class per page/component
│   ├── LoginPage.js
│   ├── SearchPage.js
│   ├── ShelfModal.js
│   └── RecommendationsPage.js
│
├── tests/                      # Test spec files
│   ├── login.spec.js
│   ├── search.spec.js
│   ├── save.spec.js
│   └── recommendations.spec.js
│
├── playwright.config.js        # Playwright configuration
├── package.json
└── .gitignore
```

---

## ✅ Test Coverage

| Suite | Focus |
|---|---|
| 🔐 Login | Valid login, wrong password, redirect to /room |
| 🔍 Search | Movies, books, music — tab switching, results rendering |
| 📚 Save | Save to shelf across all media types, modal interaction, cancel flow |
| 🤖 AI Recommendations | Recommendations load, refresh on Favourites change |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Git
- Scriptorium frontend running locally (`http://localhost:3000`) **or** use production URL

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Nerdy-Babushkas/scriptorium-tests.git
cd scriptorium-tests

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific suite
npx playwright test tests/login.spec.js
npx playwright test tests/search.spec.js
npx playwright test tests/save.spec.js
npx playwright test tests/recommendations.spec.js

# Run with UI mode (interactive)
npx playwright test --ui

# Run headed (watch the browser)
npx playwright test --headed

# View last test report
npx playwright show-report
```

---

## ⚙️ Configuration

All configuration lives in `playwright.config.js`.

**To run against production instead of local:**

```js
use: {
  baseURL: 'https://scriptorium-frontend.vercel.app', // swap this line
}
```

| Config | Value |
|---|---|
| Base URL | `http://localhost:3000` |
| Browser | Chromium |
| Retries | 1 |
| Workers | 1 (sequential) |
| Timeout | 60s (accounts for Vercel cold starts) |
| Headless | false (set to true for CI) |

### Auth Fixture

Tests that require a logged-in state import from `fixtures/auth.fixture.js` instead of `@playwright/test`. The fixture handles login once per suite — no repeated login flows across tests.

```js
const { test, expect } = require('../fixtures/auth.fixture');

test('should show results', async ({ authenticatedPage }) => {
  // already logged in
});
```

---

## 👤 Author

**Pranjal Surjan**
📧 Pranjalsurjan03@gmail.com
🔗 [github.com/PranjalSurjan](https://github.com/PranjalSurjan)