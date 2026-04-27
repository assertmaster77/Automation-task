# 🚗 Car Rental QA Automation Framework

End-to-end test automation project built with **Playwright, TypeScript, and Faker**.

Covers UI booking flow for car rentals and REST API validation.

---


### 🖥 UI Automation (Car Rental Flow)

Automates full user journey:

- Open car rental search page
- Enter pickup location (JFK / New York flow)
- Select suggestion and search
- Open first available deal in a new tab
- Navigate through Extras → Checkout
- Fill:
  - Contact details
  - Booker information
  - Billing address
- Select payment method (Google Pay)
- Verify final booking state

---

### 🌐 API Automation

Tests public REST API:
https://api.restful-api.dev/objects

Coverage:

- GET all devices
- CREATE a device
- GET a device by ID
- DELETE a device
- Validate device deletion (404)

---

## 📁 Project Structure

```bash
├── node_modules/ # Installed dependencies
├── Config/ # Configuration and helper files
│ ├── apiUrl.ts # API base url
│ └── dataGenerator.ts # Additional helper/config file
│
├── Pages/ # Page Object Model (POM) classes
│ ├── ApiObjects.ts # API request objects
│ ├── CarRent.ts # Car rental page actions
│ └── Checkout.ts # Checkout page actions
│
├── tests/ # Test files
│ ├── apiTests.spec.ts # API test scenarios
│ └── carRentalFlowTests.spec.ts # UI car rental flow tests
│
├── playwright-report/ # HTML test reports
│ └── index.html # Playwright report entry point
│
├── test-results/ # Raw test execution results
│
├── playwright.config.ts # Playwright configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Project dependencies and scripts
├── package-lock.json # Dependency lock file
├── .gitignore # Git ignored files
└── README.md # Project documentation

playwright.config.ts