# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





frontend/
└── src/
    ├── App.jsx
    ├── main.jsx
    │
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Loader.jsx
    │   │   └── Toast.jsx
    │   │
    │   ├── admin/
    │   │   ├── UserTable.jsx
    │   │   ├── UserFormModal.jsx
    │   │   └── SettingsForm.jsx
    │   │
    │   ├── instructor/
    │       ├── CourseForm.jsx
    │       ├── QuestionForm.jsx
    │       ├── ModuleCard.jsx
    │       └── LessonEditorModal.jsx
    │
    ├── pages/
    │   ├── auth/
    │   │   └── Login.jsx
    │   │
    │   ├── admin/
    │   │   ├── Dashboard.jsx
    │   │   ├── Users.jsx
    │   │   ├── Settings.jsx
    │   │   └── Roles.jsx       ← optional
    │   │
    │   ├── instructor/
    │       ├── Dashboard.jsx
    │       ├── Courses.jsx
    │       ├── Modules.jsx
    │       ├── Questions.jsx
    │       ├── Exams.jsx
    │       └── Students.jsx
    │
    ├── routes/
    │   └── ProtectedRoutes.jsx
    │
    ├── services/
    │   ├── api.js
    │   ├── authService.js
    │   ├── userService.js
    │   ├── courseService.js
    │   └── examService.js
    │
    └── styles/
        └── global.css



🎨 Theme & Design:

Use only black, white, and red (#ff0000) as theme colors (monochrome look).

The overall design should be clean, minimalistic, and modern, inspired by Nothing OS UI — flat design, high contrast, geometric fonts, simple layout.

Background: white or light gray, text: black, accents: red.

Include hover effects and subtle animations (opacity or scale) using CSS transitions.

📱 Responsiveness:

Must be fully responsive across desktop, tablet, and mobile.

Use flexbox or grid layout where appropriate.

Navbar or sidebar should collapse or stack neatly on smaller screens.

⚙️ Functionality & Structure:

Make the page dynamic and reusable (use React state or props).

Use semantic JSX structure and meaningful sectioning (header, main, footer if needed).

Include dummy or mock data to simulate real content (tables, cards, charts, etc. depending on the page).

Show placeholders or empty states where data would normally appear.

Keep code modular and clean.

🧩 File Name: <INSERT FILE NAME HERE>
(Example: Users.jsx, Courses.jsx, Dashboard.jsx, etc.)

🎯 Page Purpose:
<Briefly describe the purpose of this page here>
(Example: "Displays all users in a table with options to add, edit, or suspend users.")

Additional Requirements:

Include a simple header title at the top (e.g., “User Management”).

Add a clear call-to-action button (e.g., Add User, Create Course, Add Question, etc.) styled in red.

Keep spacing consistent and balanced.

Avoid using external UI libraries except Tailwind (if used).

Code must be self-contained and production-ready.

No placeholder lorem text — use realistic mock data or clear labels.