# 📚 BookBridge

A university library management system that lets students discover and borrow books while giving administrators full control over the library's catalog and operations.

🔗 **Live Demo:** [click here](https://library-management-eight-chi-66.vercel.app/)

---

## ✨ Features

### 👨‍🎓 Student
- Browse and search the book catalog with server-side filtering and pagination
- Borrow books and track due dates
- View borrowing history and current loans

### 🛠️ Admin
- Full dashboard to manage books, users, and borrow records
- Add, edit, and remove books with cover image uploads
- Monitor active loans and process returns

---

## 🧰 Tech Stack

**Frontend**
- [Next.js 15](https://nextjs.org/) — App Router, Server Components
- [TypeScript](https://www.typescriptlang.org/)
- [HeroUI](https://www.heroui.com/) — UI component library
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Better Auth](https://better-auth.com/) — authentication

**Backend**
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with Mongoose
- [ImgBB](https://imgbb.com/) — image hosting

**Deployment**
- Frontend → [Vercel](https://vercel.com/)
- Backend → [Render](https://render.com/)
- Database → [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas cluster
- ImgBB API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bookbridge.git
cd bookbridge
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=http://localhost:3000
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd client
npm install
```

Create a `.env.local` file in the `client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
bookbridge/
├── client/          # Next.js frontend
│   ├── app/         # App Router pages and layouts
│   ├── components/  # Reusable UI components
│   └── lib/         # Utilities and auth config
└── server/          # Express.js backend
    ├── routes/      # API route handlers
    ├── models/      # Mongoose models
    └── middleware/  # Auth and error middleware
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
