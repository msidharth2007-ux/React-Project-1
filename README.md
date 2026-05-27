# MediCare+ Hospital Appointment Booking System

A complete React JS Hospital Appointment Booking System with a built-in live demo system. Designed for a first-year engineering student project.

## Features
- **Modern UI**: Glassmorphism, Tailwind CSS styling, Framer Motion animations.
- **Frontend Only**: Uses LocalStorage as a fake backend/database. No Node.js or SQL required.
- **User Roles**: Patient and Admin dashboards.
- **Live Demo Panel**: A special `/admin-demo` route that automatically simulates the entire backend workflow (login, fetching doctors, booking, notifications) visually.

## Tech Stack
- React JS (Vite)
- Tailwind CSS
- React Router DOM
- Framer Motion
- React Icons

## Getting Started

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run the Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open in Browser**
   Navigate to `http://localhost:5173`

## Demo Accounts
- **Admin**: admin@medicare.com / admin123
- **User**: user@medicare.com / user123

## Key Pages
- **Home (`/`)**: Landing page.
- **Doctors (`/doctors`)**: List of all available doctors.
- **Book Appointment (`/book-appointment/:id`)**: Form to book a doctor.
- **Admin Demo (`/admin-demo`)**: The automated backend simulation page.
