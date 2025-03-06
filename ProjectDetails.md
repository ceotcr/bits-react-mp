# **E-Commerce Admin Dashboard**

## **Project Overview**

Develop an admin panel where users can manage products, carts, users, orders, recipes, posts, comments, and quotes using the **DummyJSON API**.

## **Core Features**

### **~~1. Authentication (Auth API)~~**

- \~\~Implement a login page using \~\~\*\*~~React Hook Form~~\*\* ~~for form validation.~~
- ~~Handle failed login attempts with proper error messages.~~
- ~~Store authentication tokens using \*\*Zustand\*\*.~~

---

### **~~2. Product Management~~**

- ~~Display all products (GET~~ `/products`~~).~~
- ~~View product details (GET~~ `/products/{id}`~~).~~
- ~~Implement \*\*search and filter functionality\*\* using \*\*useState\*\*.~~
- ~~Implement \*\*sorting using useReducer\*\*.~~
- ~~Add, edit, and delete products using the \*\*API\*\*.~~
- ~~Form validation with \*\*React Hook Form\*\*.~~
- ~~UI using \*\*Material UI / Chakra UI / Ant Design\*\*.~~

---

### **~~3. Cart Management (Admin Perspective)~~**

- ~~Fetch cart data (GET /carts).~~
- ~~Add items to the cart (POST /carts/add).~~
- ~~Remove items from the cart.~~
- ~~Show cart summary with total price calculations.~~
- ~~Use Zustand to maintain global cart state.~~

---

### **4. User Management**

- Fetch all users (GET `/users`).
- View user details (GET `/users/{id}`).
- Implement **search and filtering**.
- Allow admin to edit user details.

---

### **~~5. Order Management~~**

- ~~Fetch all orders (GET~~ `/carts` ~~as order history).~~
- ~~Display order details and associated users.~~
- ~~Implement ~~\*\*~~order status update~~\*\* ~~feature.~~

---

### **6. Blog & Comments Section**

- Fetch posts (GET `/posts`).
- View post details (GET `/posts/{id}`).
- Fetch comments for a post (GET `/comments`).
- Allow adding new comments (POST `/comments/add`).
- Use **Zustand** to manage user comments globally.

---

### **7. Quotes & Recipes**

- Fetch motivational quotes (GET `/quotes`).
- Fetch recipes (GET `/recipes`).
- Display quotes and recipes on a dashboard.

---

## **Tech Stack**

- **React + Vite**
- **UI Library**: Ant Design, Chakra UI, Material UI
- **React Query** (TanStack Query) for API calls
- **Axios** for handling HTTP requests
- **React Hook Form** for form handling & validation
- **useState, useReducer** for component state management
- **Context API & Zustand** for global state management
- **React Router** for navigation

---

## **Stretch Goals (Optional)**

- Implement **Dark Mode** using `useContext`
- Add **pagination** for large datasets
- Add **user role management** for restricting actions

---

## **API Endpoints Used**

<https://dummyjson.com/docs>

- `POST /auth/login` - User authentication
- `GET /users` - List users
- `GET /users/{id}` - Get user details
- `GET /products` - List products
- `GET /products/{id}` - Get product details
- `POST /carts/add` - Create a new cart (order)
- `GET /carts` - List all carts (orders)
- `GET /carts/{id}` - Get cart details
- `DELETE /carts/{id}` - Cancel an order
- `GET /quotes` - Fetch quotes
- `GET /recipes` - Fetch recipes
- `GET /posts` - Fetch posts
- `GET /comments` - Fetch comments
- `POST /comments/add` - Add a comment
