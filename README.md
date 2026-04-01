# Full-Stack E-Commerce Application

A complete MERN stack e-commerce platform with a customer-facing shopping app, an admin dashboard for managing products and users, and a REST API backend. Built with React, Node.js, Express, and MongoDB.

---

## Table of Contents

1. [What This App Does](#what-this-app-does)
2. [Architecture Overview](#architecture-overview)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [File-by-File Explanation](#file-by-file-explanation)
   - [Backend — e-commerce_api](#backend--e-commerce_api)
   - [Customer Frontend — e-commerce_app](#customer-frontend--e-commerce_app)
   - [Admin Dashboard — e-commerce_admin](#admin-dashboard--e-commerce_admin)
6. [Application Flow](#application-flow)
   - [Customer Journey](#customer-journey)
   - [Admin Journey](#admin-journey)
   - [Authentication Flow](#authentication-flow)
7. [Database Schema](#database-schema)
8. [API Endpoints](#api-endpoints)
9. [How to Run the Project](#how-to-run-the-project)
10. [Step-by-Step Build Algorithm](#step-by-step-build-algorithm)
11. [Key Concepts Glossary](#key-concepts-glossary)

---

## What This App Does

This is a **clothing e-commerce website** with two separate interfaces:

- **Customer App** — Shoppers can browse products, filter by category/color/size, add items to a cart, and place orders.
- **Admin Dashboard** — Store owners can add/edit/delete products, manage users, and view sales analytics.
- **Backend API** — A single Express server handles all data: users, products, carts, and orders, stored in MongoDB.

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                        BROWSER                               │
│                                                              │
│   ┌────────────────────┐     ┌────────────────────────────┐  │
│   │  Customer App      │     │  Admin Dashboard           │  │
│   │  (React + Vite)    │     │  (React + CRA)             │  │
│   │  Port: 5173        │     │  Port: 3000                │  │
│   └────────┬───────────┘     └────────────┬───────────────┘  │
│            │  HTTP requests via Axios      │                  │
└────────────┼──────────────────────────────┼──────────────────┘
             │                              │
             ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend API (Express.js)  Port: 5000            │
│                                                              │
│   /api/auth    /api/user    /api/product   /api/cart         │
│   /api/order                                                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │   MongoDB Database    │
               │  (Mongoose ORM)       │
               └───────────────────────┘
```

---

## Tech Stack

### Backend
| Tool | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js 5 | Web framework / routing |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling (schemas) |
| JSON Web Token (JWT) | User authentication tokens |
| CryptoJS | Password encryption |
| Razorpay | Payment gateway integration |
| dotenv | Environment variable management |
| cors | Allow cross-origin requests from frontend |
| Nodemon | Auto-restart server on file changes |

### Customer Frontend
| Tool | Purpose |
|---|---|
| React 19 | UI library |
| Vite | Fast dev server and build tool |
| React Router DOM | Client-side page routing |
| Redux Toolkit | Global state management |
| redux-persist | Save Redux state to localStorage |
| Material-UI (MUI) | Ready-made UI components |
| styled-components | CSS-in-JS styling |
| Axios | HTTP requests to the API |

### Admin Dashboard
| Tool | Purpose |
|---|---|
| React 17 | UI library |
| Create React App (CRA) | Project setup |
| Redux Toolkit | Global state management |
| redux-persist | Save Redux state to localStorage |
| Material-UI + DataGrid | Tables, components, grids |
| Recharts | Charts and analytics graphs |
| Firebase | Image storage (product photos) |
| Axios | HTTP requests to the API |
| timeago.js | Human-readable timestamps |

---

## Project Structure

```
e-commerce_app/                      ← Root folder
│
├── e-commerce_api/                  ← Backend (Node.js/Express)
│   ├── index.js                     ← Server entry point
│   ├── database.js                  ← MongoDB connection
│   ├── models/                      ← Database schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   └── routes/                      ← API endpoints
│       ├── auth.js
│       ├── user.js
│       ├── product.js
│       ├── cart.js
│       ├── order.js
│       └── verifyToken.js
│
├── e-commerce_app/                  ← Customer Frontend (React + Vite)
│   ├── src/
│   │   ├── main.jsx                 ← App entry point
│   │   ├── App.jsx                  ← Route definitions
│   │   ├── data.js                  ← Static content data
│   │   ├── responsive.js            ← Mobile media query helper
│   │   ├── pages/                   ← Full page components
│   │   │   ├── Home.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── components/              ← Reusable UI pieces
│   │   │   ├── Navbar.jsx
│   │   │   ├── Slider.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── CategoryItem.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Announcement.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ScrollToTop.jsx
│   │   └── redux/                   ← State management
│   │       ├── store.js
│   │       ├── cartRedux.js
│   │       ├── userRedux.js
│   │       ├── apiCalls.js
│   │       └── requestMethods.js
│   ├── index.html
│   └── vite.config.js
│
└── e-commerce_admin/                ← Admin Dashboard (React + CRA)
    ├── src/
    │   ├── index.js                 ← App entry point
    │   ├── App.js                   ← Route definitions (protected)
    │   ├── firebase.js              ← Firebase config for image storage
    │   ├── requestMethods.js        ← Axios instances
    │   ├── pages/                   ← Full page components
    │   │   ├── Login.jsx
    │   │   ├── Home.jsx
    │   │   ├── UserList.jsx
    │   │   ├── User.jsx
    │   │   ├── NewUser.jsx
    │   │   ├── ProductList.jsx
    │   │   ├── Product.jsx
    │   │   └── NewProduct.jsx
    │   ├── components/              ← Reusable UI pieces
    │   │   ├── Topbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Chart.jsx
    │   │   ├── FeaturedInfo.jsx
    │   │   ├── WidgetSm.jsx
    │   │   └── WidgetLg.jsx
    │   └── redux/                   ← State management
    │       ├── store.js
    │       ├── userRedux.js
    │       ├── productRedux.js
    │       ├── apiCalls.js
    │       └── dummyData.js
    └── public/
```

---

## File-by-File Explanation

---

### Backend — `e-commerce_api`

#### `index.js` — Server Entry Point
This is where the whole backend starts. It:
- Creates the Express app
- Enables CORS so the frontend (different port) can talk to it
- Parses incoming JSON request bodies
- Connects to MongoDB by calling `database.js`
- Mounts all route files under `/api/auth`, `/api/user`, `/api/product`, `/api/cart`, `/api/order`
- Starts listening on a port (usually 5000)

#### `database.js` — MongoDB Connection
Contains a single function that uses Mongoose to connect to MongoDB using the URL stored in your `.env` file. Called once from `index.js` when the server starts.

---

#### `models/User.js` — User Schema
Defines the shape of a user record in MongoDB:
| Field | Type | Notes |
|---|---|---|
| username | String | Required, unique |
| email | String | Required, unique |
| password | String | Required, encrypted with CryptoJS |
| isAdmin | Boolean | Default: false. Controls admin access |
| img | String | Optional profile image URL |
| timestamps | Auto | createdAt and updatedAt added automatically |

#### `models/Product.js` — Product Schema
Defines what a product looks like in the database:
| Field | Type | Notes |
|---|---|---|
| title | String | Required, unique |
| desc | String | Product description |
| img | String | Image URL |
| categories | Array | e.g., ["shirts", "women"] |
| size | Array | e.g., ["S", "M", "L", "XL"] |
| colour | Array | e.g., ["red", "blue"] |
| price | Number | Required |
| inStock | Boolean | Default: true |

#### `models/Cart.js` — Cart Schema
Each user has one cart document:
| Field | Type | Notes |
|---|---|---|
| userId | String | Required, unique (one cart per user) |
| products | Array | `[{ productId, quantity }]` |
| amount | Number | Total price |
| address | Object | Delivery address |
| status | String | Default: "pending" |

#### `models/Order.js` — Order Schema
Placed orders are stored separately from carts:
| Field | Type | Notes |
|---|---|---|
| userId | String | Who placed the order |
| products | Array | `[{ productId, quantity }]` |
| amount | Number | Total price |
| address | Object | Delivery address |
| status | String | Default: "pending" |

---

#### `routes/verifyToken.js` — Authentication Middleware
Three middleware functions used to protect routes:

- **`verifyToken()`** — Checks that the request has a valid JWT token. If no token or invalid token → rejects the request.
- **`verifyTokenAndAuthorization()`** — Extends `verifyToken`. Also checks that the logged-in user is either accessing their own data OR is an admin. Prevents users from viewing/editing other users' data.
- **`verifyTokenAndAdmin()`** — Extends `verifyToken`. Only allows admins to proceed. Used for routes that manage all users/products.

#### `routes/auth.js` — Register & Login
- `POST /api/auth/register` — Takes username, email, password. Encrypts the password with CryptoJS, saves the new user to MongoDB.
- `POST /api/auth/login` — Takes username + password. Finds the user, decrypts and compares passwords. If correct, generates a JWT token (valid for 10 days) and returns it along with the user object.

#### `routes/user.js` — User Management
- `PUT /:id` — Update user details (own account or admin)
- `DELETE /:id` — Delete a user (own account or admin)
- `GET /stats` — Admin only. Returns new user counts per month for charts
- `GET /` — Admin only. Get all users (or the 5 newest with `?new=true`)
- `GET /:id` — Admin only. Get one user by ID

#### `routes/product.js` — Product Management
- `POST /` — Admin only. Create a new product
- `PUT /:id` — Admin only. Update a product
- `DELETE /:id` — Admin only. Delete a product
- `GET /find/:id` — Public. Get one product by ID
- `GET /` — Public. Get all products. Optional filters: `?new=true` (latest 5), `?category=shirts`

#### `routes/cart.js` — Cart Management
- `POST /` — Create a cart (logged-in users only)
- `PUT /:id` — Update a cart (own cart only)
- `DELETE /:id` — Delete a cart (own cart only)
- `GET /find/:userId` — Get a user's cart (own cart only)
- `GET /` — Admin only. Get all carts

#### `routes/order.js` — Order Management
- `POST /` — Place an order (logged-in users only)
- `PUT /:id` — Update order status (admin only)
- `DELETE /:id` — Delete an order (admin only)
- `GET /find/:userId` — Get a user's orders (own orders only)
- `GET /` — Admin only. Get all orders
- `GET /income` — Admin only. Monthly income stats. Optional filter: `?pid=productId`

---

### Customer Frontend — `e-commerce_app`

#### `main.jsx` — React Entry Point
The very first file React loads. It renders the entire app inside two wrappers:
- `<Provider store={store}>` — Makes the Redux store available everywhere
- `<PersistGate>` — Waits for redux-persist to reload saved state from localStorage before rendering

#### `App.jsx` — Routing Setup
Defines which page component renders at which URL path using React Router:
| Path | Component |
|---|---|
| `/` | Home |
| `/products/:category` | ProductList |
| `/product/:id` | Product (detail) |
| `/cart` | Cart |
| `/login` | Login |
| `/register` | Register |

Also renders `<ScrollToTop>` once, wrapping all routes so the page scrolls to top on navigation.

#### `data.js` — Static Content
Hardcoded arrays of data used for the hero slider images and category cards. No API call needed for these — they're always the same.

#### `responsive.js` — Mobile Helper
Exports a single `mobile()` function that wraps any CSS in a `@media (max-width: 768px)` query. Used throughout styled-components to make the layout mobile-friendly without repeating the media query everywhere.

---

#### Pages

**`pages/Home.jsx`** — The landing page. Stacks these components top to bottom: `Announcement` → `Navbar` → `Slider` → `Categories` → `Products` → `Newsletter` → `Footer`.

**`pages/ProductList.jsx`** — Shows a grid of products for a category. Has a left sidebar with filter options (color checkboxes, size dropdown) and a sort dropdown (newest, price low-to-high, price high-to-low). When filters change, it calls the API with the new params.

**`pages/Product.jsx`** — Single product detail page. Fetches the product by ID from the API. Shows the image, description, price, and lets the user choose a color, size, and quantity before clicking "Add to Cart." Dispatches the `addProduct` Redux action when added.

**`pages/Cart.jsx`** — Shows everything in the Redux cart state. Lets users increase/decrease item quantities using `incrementQuantity` / `decrementQuantity` actions. Shows the total price. The "Checkout" button calls `POST /api/order` to place the order (requires the user to be logged in).

**`pages/Login.jsx`** — Login form. On submit, calls `loginUser()` from `apiCalls.js`, which dispatches Redux actions to store the user token globally.

**`pages/Register.jsx`** — Registration form UI. Collects username, email, and password fields. (The backend route exists; form submission logic can be wired up.)

---

#### Components

**`Announcement.jsx`** — A thin colored banner across the very top of the page showing a promotional message (e.g., "Free shipping on orders over $50").

**`Navbar.jsx`** — The site header. Contains the logo/brand name in the center, a search bar on the left, and icons (wishlist, cart) on the right. The cart icon shows a red badge with the number of items in the Redux cart state.

**`Slider.jsx`** — A full-width hero image carousel. Uses left/right arrow buttons to cycle through slides. Each slide has a background image, a title, a description, and a "Shop Now" button. The slides use data from `data.js`.

**`Categories.jsx`** — Renders three `CategoryItem` components side by side (Shirts, Dresses, Jackets). Each links to the ProductList page for that category.

**`CategoryItem.jsx`** — A single category card with a background image, a title, and a "Shop Now" button that navigates to `/products/:category`.

**`Products.jsx`** — Fetches products from `GET /api/product` (with optional category/filter params passed from ProductList). Renders a grid of `Product` card components.

**`Product.jsx`** (component, not page) — An individual product card in the grid. Shows the product image. On hover, an overlay appears with three icons: add to cart, wishlist, and quick view.

**`Newsletter.jsx`** — A section at the bottom of the home page with a heading and an email input + subscribe button.

**`Footer.jsx`** — A 4-column footer with the brand description, useful links, contact details, and accepted payment method icons. On mobile, the middle two columns are hidden.

**`ScrollToTop.jsx`** — A utility component with no visible UI. It uses a React Router hook to detect URL changes and calls `window.scrollTo(0, 0)` each time, so the page always starts at the top when navigating.

---

#### Redux (State Management)

**`redux/requestMethods.js`** — Creates two Axios instances:
- `publicRequest` — No token needed. Used for browsing products, logging in.
- `userRequest` — Automatically attaches the JWT token from Redux state to every request header. Used for cart, orders, and anything requiring login.

**`redux/store.js`** — Sets up the Redux store with two slices (user + cart) and wires up `redux-persist` so the state survives page refreshes (saved to `localStorage`).

**`redux/userRedux.js`** — Redux slice for the logged-in user:
- State: `{ currentUser, isFetching, error }`
- Actions: `loginStart` (loading), `loginSuccess` (saves user + token), `loginFailure` (sets error flag)

**`redux/cartRedux.js`** — Redux slice for the shopping cart:
- State: `{ products[], quantity, total }`
- Actions:
  - `addProduct` — Adds a new item to the cart, updates quantity and total
  - `incrementQuantity` — Increases qty of an item by 1
  - `decrementQuantity` — Decreases qty of an item by 1 (removes if qty reaches 0)

**`redux/apiCalls.js`** — Contains `loginUser(dispatch, user)` — calls `POST /api/auth/login`, dispatches the appropriate Redux actions based on success or failure.

---

### Admin Dashboard — `e-commerce_admin`

#### `index.js` — React Entry Point
Same pattern as the customer app: wraps the app in `<Provider>` and `<PersistGate>` for Redux.

#### `App.js` — Protected Routing
Defines all admin routes. Uses a conditional redirect: if the current user is not an admin, they are sent to the `/login` page. This is the "route guard" that protects all admin pages.

#### `firebase.js` — Firebase Config
Initializes the Firebase app with the project credentials and exports a `storage` reference. Used by the `NewProduct` page to upload product images to Firebase Storage and get back a download URL.

#### `requestMethods.js` — Axios Instances
Same pattern as customer app: `publicRequest` (no token) and `userRequest` (auto-attaches admin JWT token).

---

#### Pages

**`pages/Login.jsx`** — Admin login form. Calls the same `/api/auth/login` API. If the returned user has `isAdmin: true`, login succeeds and the admin is redirected to the dashboard.

**`pages/Home.jsx`** — The main dashboard page. Assembles four components:
1. `FeaturedInfo` — KPI cards (revenue, sales, cost)
2. `Chart` — Monthly user growth line chart
3. `WidgetSm` — Recent user transactions
4. `WidgetLg` — Recent orders table

**`pages/UserList.jsx`** — Shows all users in a MUI DataGrid table. Each row has an Edit button (links to the User detail page) and a Delete button (calls the delete API directly). Fetches users from the API on load.

**`pages/User.jsx`** — User detail view. Shows the user's info and an edit form to update their details. Calls `PUT /api/user/:id` on save.

**`pages/NewUser.jsx`** — A form to create a new user. Collects all user fields and calls `POST /api/auth/register`.

**`pages/ProductList.jsx`** — Shows all products in a MUI DataGrid. Each row shows the product image, name, stock status, and price. Has Edit and Delete buttons per row.

**`pages/Product.jsx`** — Product detail + edit page. Shows a small sales chart for the product, alongside an edit form pre-filled with the current product data. Calls `PUT /api/product/:id` on save.

**`pages/NewProduct.jsx`** — Form to add a new product. When the admin selects an image file, it uploads to Firebase Storage, gets the download URL, then submits the full product data (including the Firebase image URL) to `POST /api/product`.

---

#### Components

**`Topbar.jsx`** — The top header bar. Shows the app name on the left and icons (notifications, settings, user avatar) on the right.

**`Sidebar.jsx`** — Left navigation panel. Contains links to all admin pages: Dashboard, Users, Products, Orders, etc. grouped into sections.

**`Chart.jsx`** — A reusable line chart built with Recharts. Accepts a `data` array and a `dataKey` string as props, so it can display any monthly metric (users, revenue, etc.).

**`FeaturedInfo.jsx`** — Three metric cards at the top of the dashboard:
- Revenue (total earnings)
- Sales (orders placed)
- Cost (expenses)
Each shows a value and a percentage change arrow (up = green, down = red) compared to last month.

**`WidgetSm.jsx`** — A small card widget that fetches and shows the 5 newest users with a "Display" button next to each.

**`WidgetLg.jsx`** — A larger card that shows recent orders in a table with customer name, date, amount, and a colored status badge (Approved / Declined / Pending).

---

#### Redux (Admin)

**`redux/store.js`** — Admin Redux store. Persists user and product slices to localStorage.

**`redux/userRedux.js`** — Same auth slice pattern as customer app (loginStart/Success/Failure).

**`redux/productRedux.js`** — Product management slice:
- State: `{ products[], isFetching, error }`
- Actions: `getProductsStart/Success/Failure`, `addProductStart/Success/Failure`, `updateProductStart/Success/Failure`, `deleteProduct`

**`redux/apiCalls.js`** — All admin API functions:
- `login(dispatch, user)` — Admin login
- `getProducts(dispatch)` — Fetch all products
- `deleteProduct(id, dispatch)` — Delete a product
- `updateProduct(id, product, dispatch)` — Update a product
- `addProduct(product, dispatch)` — Add a new product

**`redux/dummyData.js`** — Hardcoded monthly chart data used as a fallback when real API data isn't available yet (useful during development).

---

## Application Flow

### Customer Journey

```
User opens the site
        │
        ▼
┌──────────────────┐
│   Home Page      │  ← Announcement + Navbar + Slider (static)
│                  │
│  Categories      │  ← Click "Shirts" → /products/shirts
│  Products Grid   │  ← Fetches from GET /api/product
└────────┬─────────┘
         │ Click a product
         ▼
┌──────────────────────────────┐
│   Product Detail Page         │
│                               │
│  - Image, price, description  │
│  - Choose: color, size, qty   │
│  - Click "Add to Cart"        │  ← Dispatched to Redux cartSlice
│    (stored in localStorage)   │
└──────────────┬────────────────┘
               │ Go to Cart
               ▼
┌──────────────────────────────┐
│   Cart Page                   │
│                               │
│  - All items from Redux state │
│  - Adjust quantities          │
│  - See total price            │
│  - Click "Checkout"           │
└──────────────┬────────────────┘
               │
               ▼
    Is user logged in?
         │         │
        YES        NO
         │          └──→ Login Page → POST /api/auth/login
         │                              └── JWT saved to Redux
         ▼
POST /api/order  ← Order created in MongoDB/
        │
        ▼
   Order Placed!
```

### Admin Journey

```
Admin opens the dashboard
        │
        ▼
┌─────────────────┐
│   Login Page    │  POST /api/auth/login
│                 │  Checks: user.isAdmin === true
└────────┬────────┘
         │
         ▼
┌──────────────────────────────────┐
│   Dashboard (Home)                │
│                                   │
│  - Revenue, Sales, Cost cards     │  ← GET /api/order/income
│  - Monthly user growth chart      │  ← GET /api/user/stats
│  - Recent users widget            │  ← GET /api/user?new=true
│  - Recent orders widget           │  ← GET /api/order
└──────┬───────────────────────────┘
       │
       ├──→ ProductList → Add / Edit / Delete products
       │         └── New product image uploaded to Firebase first
       │
       └──→ UserList → View / Edit / Delete users
```

### Authentication Flow

```
                 REGISTER                          LOGIN
                    │                               │
                    ▼                               ▼
         POST /api/auth/register         POST /api/auth/login
                    │                               │
                    │                    Password decrypted & compared
                    │                               │
         Password encrypted               JWT Token generated
         with CryptoJS                    (valid for 10 days)
                    │                               │
         User saved to MongoDB                      ▼
                                       Token + User object returned
                                                    │
                                                    ▼
                                       Saved to Redux store (userSlice)
                                                    │
                                                    ▼
                                       redux-persist saves to localStorage
                                                    │
                                                    ▼
                                    Token auto-attached to all future
                                    API requests via userRequest Axios instance
```

---

## Database Schema

```
USERS Collection
┌──────────────┬────────────┬──────────────────────────────┐
│ Field        │ Type       │ Notes                        │
├──────────────┼────────────┼──────────────────────────────┤
│ _id          │ ObjectId   │ Auto-generated               │
│ username     │ String     │ Unique, required             │
│ email        │ String     │ Unique, required             │
│ password     │ String     │ AES encrypted                │
│ isAdmin      │ Boolean    │ Default: false               │
│ img          │ String     │ Profile picture URL          │
│ createdAt    │ Date       │ Auto (timestamps)            │
│ updatedAt    │ Date       │ Auto (timestamps)            │
└──────────────┴────────────┴──────────────────────────────┘

PRODUCTS Collection
┌──────────────┬────────────┬──────────────────────────────┐
│ Field        │ Type       │ Notes                        │
├──────────────┼────────────┼──────────────────────────────┤
│ _id          │ ObjectId   │ Auto-generated               │
│ title        │ String     │ Unique, required             │
│ desc         │ String     │ Product description          │
│ img          │ String     │ Image URL (Firebase)         │
│ categories   │ [String]   │ e.g. ["shirts", "women"]     │
│ size         │ [String]   │ e.g. ["S", "M", "L"]         │
│ colour       │ [String]   │ e.g. ["red", "blue"]         │
│ price        │ Number     │ Required                     │
│ inStock      │ Boolean    │ Default: true                │
└──────────────┴────────────┴──────────────────────────────┘

CARTS Collection
┌──────────────┬────────────┬──────────────────────────────┐
│ Field        │ Type       │ Notes                        │
├──────────────┼────────────┼──────────────────────────────┤
│ _id          │ ObjectId   │ Auto-generated               │
│ userId       │ String     │ Unique (one cart per user)   │
│ products     │ [Object]   │ [{productId, quantity}]      │
│ amount       │ Number     │ Total cart value             │
│ address      │ Object     │ Delivery address             │
│ status       │ String     │ Default: "pending"           │
└──────────────┴────────────┴──────────────────────────────┘

ORDERS Collection
┌──────────────┬────────────┬──────────────────────────────┐
│ Field        │ Type       │ Notes                        │
├──────────────┼────────────┼──────────────────────────────┤
│ _id          │ ObjectId   │ Auto-generated               │
│ userId       │ String     │ Who placed the order         │
│ products     │ [Object]   │ [{productId, quantity}]      │
│ amount       │ Number     │ Total order value            │
│ address      │ Object     │ Delivery address             │
│ status       │ String     │ Default: "pending"           │
└──────────────┴────────────┴──────────────────────────────┘
```

---

## API Endpoints

### Authentication — `/api/auth`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | None | Create new user account |
| POST | `/auth/login` | None | Login, returns JWT token |

### Users — `/api/user`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| PUT | `/:id` | Own account or Admin | Update user |
| DELETE | `/:id` | Own account or Admin | Delete user |
| GET | `/stats` | Admin only | Monthly new user counts |
| GET | `/` | Admin only | All users (add `?new=true` for 5 newest) |
| GET | `/:id` | Admin only | Get one user |

### Products — `/api/product`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | Admin only | Create product |
| PUT | `/:id` | Admin only | Update product |
| DELETE | `/:id` | Admin only | Delete product |
| GET | `/find/:id` | None | Get one product |
| GET | `/` | None | All products (filters: `?new=true`, `?category=shirts`) |

### Cart — `/api/cart`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | Logged in | Create cart |
| PUT | `/:id` | Own cart | Update cart |
| DELETE | `/:id` | Own cart | Delete cart |
| GET | `/find/:userId` | Own cart | Get user's cart |
| GET | `/` | Admin only | All carts |

### Orders — `/api/order`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | Logged in | Place order |
| PUT | `/:id` | Admin only | Update order status |
| DELETE | `/:id` | Admin only | Delete order |
| GET | `/find/:userId` | Own orders | Get user's orders |
| GET | `/` | Admin only | All orders |
| GET | `/income` | Admin only | Monthly income stats |

---

## How to Run the Project

### Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas cloud)
- A Firebase project with Storage enabled
- Git

### 1. Start the Backend

```bash
cd e-commerce_api
npm install
```

Create a `.env` file in `e-commerce_api/`:
```
MONGO_URL=mongodb://localhost:27017/ecommerce
# OR for Atlas:
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce

JWT_SEC=your_jwt_secret_key
PASS_SEC=your_password_encryption_key
```

```bash
npm start     # or: npx nodemon index.js
```
Backend runs at: `http://localhost:5000`

### 2. Start the Customer Frontend

```bash
cd e-commerce_app
npm install
npm run dev
```
Customer app runs at: `http://localhost:5173`

### 3. Start the Admin Dashboard

```bash
cd e-commerce_admin
npm install
npm start
```
Admin dashboard runs at: `http://localhost:3000`

> **Note:** Make sure the API `baseURL` in both frontends' `requestMethods.js` points to `http://localhost:5000`.

---

## Step-by-Step Build Algorithm

This section explains **how to build a project like this from scratch**, in the exact order the files should be created. Use this as a template for your next full-stack project.

```
════════════════════════════════════════════════════════════════
  PHASE 1 — PLAN (No code yet)
════════════════════════════════════════════════════════════════

  STEP 1: Define what your app needs to DO
  │
  ├─ What features does the customer need?
  │    → Browse products, filter, add to cart, checkout, login
  │
  ├─ What features does the admin need?
  │    → Add/edit/delete products, view users, see revenue stats
  │
  └─ What data needs to be stored?
       → Users, Products, Carts, Orders
       (Each one = one MongoDB model = one database table)


════════════════════════════════════════════════════════════════
  PHASE 2 — BACKEND (Always build this first)
════════════════════════════════════════════════════════════════

  STEP 2.1: Set up Node.js project
  │  npm init
  │  npm install express mongoose dotenv cors jsonwebtoken
  │              crypto-js nodemon
  │
  STEP 2.2: Create index.js
  │  - Import express, cors, dotenv
  │  - Set up app = express()
  │  - app.use(cors()) and app.use(express.json())
  │  - Connect to DB
  │  - app.listen(PORT)
  │
  STEP 2.3: Create database.js
  │  - mongoose.connect(process.env.MONGO_URL)
  │  - Export the connect function
  │
  STEP 2.4: Create your models (DO THIS BEFORE ROUTES)
  │  - models/User.js    → what fields does a user have?
  │  - models/Product.js → what fields does a product have?
  │  - models/Cart.js    → how is a cart structured?
  │  - models/Order.js   → how is an order structured?
  │
  STEP 2.5: Create auth middleware (BEFORE routes that use it)
  │  - routes/verifyToken.js
  │  - verifyToken() — check JWT
  │  - verifyTokenAndAuthorization() — check user owns the data
  │  - verifyTokenAndAdmin() — check user is admin
  │
  STEP 2.6: Create route files (USE your models here)
  │  - routes/auth.js    → register, login
  │  - routes/user.js    → CRUD + stats
  │  - routes/product.js → CRUD + filters
  │  - routes/cart.js    → CRUD per user
  │  - routes/order.js   → CRUD + income stats
  │
  STEP 2.7: Mount routes in index.js
  │  app.use("/api/auth", authRoute)
  │  app.use("/api/user", userRoute)
  │  ... etc
  │
  STEP 2.8: Test ALL endpoints with Postman
       → Register a user
       → Login and save the token
       → Create a product (using admin token)
       → Get all products
       → Don't move to frontend until API works!


════════════════════════════════════════════════════════════════
  PHASE 3 — CUSTOMER FRONTEND
════════════════════════════════════════════════════════════════

  STEP 3.1: Create the project
  │  npm create vite@latest e-commerce_app -- --template react
  │  cd e-commerce_app
  │  npm install react-router-dom @mui/material @emotion/react
  │             @emotion/styled styled-components axios
  │             @reduxjs/toolkit react-redux redux-persist
  │
  STEP 3.2: Set up Redux FIRST (other files will need it)
  │  - redux/userRedux.js    → user slice (login state)
  │  - redux/cartRedux.js    → cart slice (cart state)
  │  - redux/store.js        → combine slices + redux-persist
  │  - redux/requestMethods.js → axios instances (public + auth)
  │  - redux/apiCalls.js     → loginUser() function
  │
  STEP 3.3: Wrap app in Redux in main.jsx
  │  <Provider store={store}>
  │    <PersistGate loading={null} persistor={persistor}>
  │      <App />
  │    </PersistGate>
  │  </Provider>
  │
  STEP 3.4: Create helper files
  │  - data.js         → static arrays for slider/categories
  │  - responsive.js   → mobile() media query helper
  │
  STEP 3.5: Build components (small pieces first, bottom-up)
  │  Build each one, test it visually, then move to the next:
  │  1. Announcement.jsx  ← simplest, just a banner
  │  2. Navbar.jsx        ← uses Redux cart quantity
  │  3. Slider.jsx        ← uses data.js, has state for slide index
  │  4. CategoryItem.jsx  ← single card, no state
  │  5. Categories.jsx    ← maps over data to render CategoryItems
  │  6. Product.jsx       ← product card with hover effect
  │  7. Products.jsx      ← fetches from API, renders Product cards
  │  8. Newsletter.jsx    ← just UI, no logic
  │  9. Footer.jsx        ← just UI
  │  10. ScrollToTop.jsx  ← uses useLocation hook
  │
  STEP 3.6: Build pages (USE your components here)
  │  1. Login.jsx       ← form + call apiCalls.loginUser()
  │  2. Register.jsx    ← form only (UI)
  │  3. Home.jsx        ← stack all components
  │  4. ProductList.jsx ← filter UI + calls Products component
  │  5. Product.jsx     ← detail view + add to cart dispatch
  │  6. Cart.jsx        ← reads Redux state + checkout order POST
  │
  STEP 3.7: Set up routing in App.jsx
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/products/:category" element={<ProductList />} />
         ... etc
       </Routes>


════════════════════════════════════════════════════════════════
  PHASE 4 — ADMIN DASHBOARD
════════════════════════════════════════════════════════════════

  STEP 4.1: Create the project
  │  npx create-react-app e-commerce_admin
  │  cd e-commerce_admin
  │  npm install @material-ui/core @material-ui/data-grid
  │             recharts axios @reduxjs/toolkit react-redux
  │             redux-persist firebase timeago.js
  │
  STEP 4.2: Set up Firebase (for image uploads)
  │  - Create Firebase project at console.firebase.google.com
  │  - Enable Firebase Storage
  │  - Copy config → firebase.js
  │
  STEP 4.3: Set up Redux (same pattern as customer app)
  │  - redux/userRedux.js     → admin user auth slice
  │  - redux/productRedux.js  → products CRUD slice
  │  - redux/store.js         → combine + persist
  │  - redux/apiCalls.js      → all API functions
  │  - redux/dummyData.js     → fake chart data for development
  │  - requestMethods.js      → axios instances
  │
  STEP 4.4: Build layout components first
  │  1. Topbar.jsx   ← header bar
  │  2. Sidebar.jsx  ← navigation links
  │
  STEP 4.5: Build data display components
  │  3. Chart.jsx        ← reusable Recharts line chart
  │  4. FeaturedInfo.jsx ← KPI cards (calls /api/order/income)
  │  5. WidgetSm.jsx     ← recent users (calls /api/user?new=true)
  │  6. WidgetLg.jsx     ← recent orders (calls /api/order)
  │
  STEP 4.6: Build pages
  │  1. Login.jsx       ← same login + check isAdmin
  │  2. Home.jsx        ← dashboard, assembles all widgets
  │  3. UserList.jsx    ← MUI DataGrid + delete/edit buttons
  │  4. User.jsx        ← user detail + edit form
  │  5. NewUser.jsx     ← create user form
  │  6. ProductList.jsx ← MUI DataGrid for products
  │  7. Product.jsx     ← product detail + chart + edit form
  │  8. NewProduct.jsx  ← create product + Firebase image upload
  │
  STEP 4.7: Set up routing in App.js with protection
       {user ? <Route path="/" element={<Home />} />
              : <Redirect to="/login" />}


════════════════════════════════════════════════════════════════
  PHASE 5 — CONNECT & TEST
════════════════════════════════════════════════════════════════

  STEP 5.1: Make sure all API baseURLs match your backend port
  STEP 5.2: Test the full customer journey end-to-end:
            Register → Login → Browse → Add to cart → Order
  STEP 5.3: Test the full admin journey:
            Login as admin → Add product → Edit product → View orders
  STEP 5.4: Test on mobile (resize browser or DevTools)
  STEP 5.5: Deploy:
            - Backend: Railway / Render / Heroku
            - Frontend: Vercel / Netlify
            - Database: MongoDB Atlas


════════════════════════════════════════════════════════════════
  SUMMARY RULE: Always build in this order:
  Data Models → API Routes → Redux Store → Components → Pages
════════════════════════════════════════════════════════════════
```

---

## Key Concepts Glossary

### JWT (JSON Web Token)
A compact, self-contained token used for authentication. When a user logs in, the server creates a token containing the user's ID and role, signs it with a secret key, and sends it back. The frontend stores this token and attaches it to future requests. The server can verify the token without looking up the database every time.

### Redux + redux-persist
**Redux** is a global state container. Instead of passing data between components through props, you store it in one central place (the "store") and any component can read from or write to it. **redux-persist** automatically saves the Redux state to `localStorage` so the data (like your cart or login status) survives if you refresh the page.

### REST API
A standard way to design API endpoints. Each URL represents a resource (e.g., `/api/product`) and the HTTP method describes what to do with it: GET = read, POST = create, PUT = update, DELETE = remove.

### Mongoose Schema
A blueprint that defines the structure of documents in a MongoDB collection. Like a form template — it says what fields are required, what types they must be, and what defaults to use.

### Protected Routes
A pattern in React where a route checks if the user is logged in before rendering the page. If not, it redirects to the login page. In the admin app, it also checks that the user has `isAdmin: true`.

### Firebase Storage
A cloud file storage service by Google. Used here to host product images. The admin uploads an image file, Firebase returns a permanent download URL, and that URL is stored in MongoDB as the product's `img` field.

### Axios Interceptors
A feature of Axios that lets you run a function before every request is sent. Used here to automatically attach the JWT token to the `Authorization` header of every authenticated request — so you don't have to manually add the token each time you call the API.

### CryptoJS AES Encryption
A way to scramble passwords before saving them to the database. Even if the database is hacked, the passwords are unreadable without the secret key. (Note: For production apps, `bcrypt` is the industry standard for password hashing.)
