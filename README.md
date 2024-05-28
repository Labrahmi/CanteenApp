# Canteen Management App

## Overview

The Canteen Management App is a desktop application designed to streamline the operations of school canteens. Built using Electron.js for the front end and Node.js for the backend REST API, the app provides a comprehensive solution for managing items, transactions, and user data.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure login for students, staff, and administrators.
- **Item Management:** Add, edit, and remove canteen items.
- **Transaction Management:** Track purchases and manage transactions.
- **Attendance Tracking:** Monitor attendance of students and staff.
- **User Management:** Manage user profiles and permissions.
- **Responsive Design:** Optimized for desktop use with a clean and intuitive interface.

## Project Structure

```
.
├── README.md
├── api
│   ├── README.md
│   ├── app
│   │   ├── controllers
│   │   │   ├── auth.js
│   │   │   ├── items.js
│   │   │   ├── transactions.js
│   │   │   └── users.js
│   │   ├── index.js
│   │   ├── middlewares
│   │   │   ├── authMiddleware.js
│   │   │   └── cacheNoStore.js
│   │   ├── models
│   │   │   ├── attendance.js
│   │   │   ├── item.js
│   │   │   ├── transaction.js
│   │   │   └── user.js
│   │   ├── routes
│   │   │   ├── auth.js
│   │   │   ├── items.js
│   │   │   ├── transactions.js
│   │   │   └── users.js
│   │   └── services
│   │       ├── auth.js
│   │       ├── items.js
│   │       ├── transactions.js
│   │       └── users.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── electron
│   ├── CHANGELOG.md
│   ├── CODE_OF_CONDUCT.md
│   ├── LICENSE
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── release
│   │   ├── app
│   │   │   ├── dist
│   │   │   │   ├── main
│   │   │   │   │   ├── main.js
│   │   │   │   │   ├── main.js.LICENSE.txt
│   │   │   │   │   └── preload.js
│   │   │   ├── package-lock.json
│   │   │   └── package.json
│   │   └── build
│   ├── src
│   │   ├── __tests__
│   │   │   └── App.test.tsx
│   │   ├── main
│   │   │   ├── main.ts
│   │   │   ├── menu.ts
│   │   │   ├── preload.ts
│   │   │   └── util.ts
│   │   └── renderer
│   │       ├── App.css
│   │       ├── App.tsx
│   │       ├── assets
│   │       ├── components
│   │       ├── index.ejs
│   │       ├── index.tsx
│   │       ├── pages
│   │       └── providers
│   ├── tailwind.config.js
│   └── tsconfig.json
├── node_modules
├── out
├── package-lock.json
└── package.json
```

### API Directory

- **controllers:** Handles request logic for different resources (auth, items, transactions, users).
- **middlewares:** Custom middleware functions (e.g., authentication, caching).
- **models:** Database models for attendance, items, transactions, and users.
- **routes:** Defines the API endpoints and associates them with controller methods.
- **services:** Contains business logic for various features.

### Electron Directory

- **src:** Source code for the Electron app.
  - **main:** Main process scripts (e.g., main.ts, menu.ts).
  - **renderer:** Renderer process scripts (e.g., App.tsx, components, pages).
- **release:** Build configuration and output for the Electron app.

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/canteen-management-app.git
   cd canteen-management-app
   ```

2. **Install dependencies:**
   ```sh
   # For the API
   cd api
   npm install

   # For the Electron app
   cd ../electron
   npm install
   ```

## Usage

### Running the API

1. **Start the server:**
   ```sh
   cd api
   npm start
   ```

2. **API will be running at:**
   ```
   http://localhost:3000
   ```

### Running the Electron App

1. **Start the Electron app:**
   ```sh
   cd electron
   npm start
   ```

## API Documentation

For detailed API documentation, refer to the [API README](api/README.md).

## Contributing

We welcome contributions! Please read our [Code of Conduct](electron/CODE_OF_CONDUCT.md) and [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](electron/LICENSE) file for details.