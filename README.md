# Tienda-Online

An online store built with **React 18 + Vite 5** (frontend), **Express** (backend), and **MongoDB** (database).

## Project Structure

This is a monorepo with two workspaces:

| Workspace | Tech Stack | Description |
|---|---|---|
| `backend/` | Express.js (CommonJS) | REST API with JWT authentication, user management, product catalog, and shopping cart |
| `front-end-react/` | React 18 + Vite 5 | SPA with login, registration, product catalog, product preview, and shopping cart |

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **MongoDB** running locally or a connection string via `MONGODB_URI`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

**Backend** (`backend/.env`):

```env
MONGODB_URI=mongodb://localhost/tienda_db
JWT_SECRET=your-secret-key
PORT=4000
```

**Frontend** (`front-end-react/.env`):

```env
VITE_API_URL=http://localhost:4000
```

### 3. Run the application

Start the backend:

```bash
cd backend && npm run ejecutar
```

Start the frontend (in a separate terminal):

```bash
cd front-end-react && npm run dev
```

The frontend dev server will be available at `http://localhost:5173` and proxies API requests to the backend at `http://localhost:4000`.

## Available Scripts

### Root

| Script | Description |
|---|---|
| `npm run lint` | Run ESLint on both backend and frontend source |
| `npm run format` | Format all source files with Prettier |

### Backend

| Script | Description |
|---|---|
| `npm start` | Start the server with Node |
| `npm run ejecutar` | Start the server with nodemon (auto-reload) |
| `npm run lint` | Run ESLint on backend source |

### Frontend

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint on frontend source |

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/API/nuevoUsuario` | No | Register a new user |
| POST | `/API/login` | No | Authenticate user |
| GET | `/API/datosPrivados` | Yes | Access protected data |
| GET | `/catalogo/cargueProductos` | No | Load product catalog |
| GET | `/catalogo/cantidadProductos` | Yes | Get cart item count |
| GET | `/catalogo/muestraCarrito` | Yes | Get cart contents |
| POST | `/catalogo/agregaCarrito` | Yes | Add product to cart |
| GET | `/catalogo/pagar` | Yes | Checkout and clear cart |
| GET | `/catalogo/inventarioInicial` | No | Initialize inventory |

## Tech Stack

- **Frontend**: React 18, Vite 5, React Router 5, Material UI 4
- **Backend**: Express 4, jsonwebtoken 9, bcryptjs 2, Mongoose 8
- **Database**: MongoDB
- **Tooling**: ESLint, Prettier, Nodemon

## License

ISC — Jorge Garrone
