# CanteenApp

**Project Title: Canteen Management System**

**Overview**

* A comprehensive solution to streamline canteen operations, providing both a robust backend API and a user-friendly Electron-based desktop application.

**Key Features**

* **User Management:** Secure login/registration, card management (registration, editing, balance updates).
* **Item Management:** Create, modify, and manage canteen inventory listing.
* **Transaction Handling:** Efficiently record sales transactions and track balances.
* **Intuitive Desktop Experience:** A well-designed Electron interface for effortless canteen management.

**Backend API (`/api`)**

* **Technology Stack:** Node.js, (Mention database used, e.g., Express.js, MongoDB)
* **RESTful Endpoints:**
    * `/auth` (User authentication and registration)
    * `/items` (Item CRUD operations)
    * `/transactions` (Recording and viewing transactions)
    * `/users` (User profile management)
* **Authentication:** (Describe your method: JWT, sessions, etc.)
* **Data Modeling:** Outline relationships between items, users, and transactions.

**Desktop Application (`/electron`)**

* **Built with:** Electron, React, Tailwind CSS (or your chosen technologies)
* **User Interface:**
    * Dashboard with key metrics (sales, inventory, etc.)
    * Forms for item and user management
    * Transaction history view with filtering/sorting

**Getting Started**

**Prerequisites**

* Node.js (version X or later)
* MongoDB (or your chosen database)

**Installation**

1. `git clone https://github.com/Labrahmi/CanteenApp.git`
2. `cd CanteenApp`
3. `npm install` (in both the `/api` and `/electron` directories) 

**Running the Development Environment**

1. **API Server:** Navigate to the `/api` directory, then `npm start`.
2. **Electron App:** Navigate to `/electron` and execute `npm start`.

**Deployment**

* **API:** (Instructions based on your hosting platform - Heroku, AWS, etc.)
* **Electron:** 
    * Use `electron-builder` to package the app.
    * Provide instructions for distributable file formats (.exe, .dmg, etc.)


