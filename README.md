A modern web application for exploring and managing book-related content, inspired by the Fire & Ice universe. The app provides a structured, scalable frontend architecture with a lightweight backend API.

🚀 Overview

Fire and Ice App is a full-stack project built with Angular and Node.js. It demonstrates modern frontend architecture patterns, reactive state management, and a clean separation between client and server.

The application focuses on:

Displaying and managing book-related data
Scalable state handling
Clean UI with modern styling
Testable and maintainable codebase
🛠️ Tech Stack
Frontend
Angular (v21) – Core framework
Angular Material – UI components
NgRx – State management
RxJS – Reactive data handling
Tailwind CSS – Styling
Backend
Node.js
Express – API layer
Nodemon – Auto-restart server
Tooling & Testing
Vitest – Unit testing (zone-less)
Angular CLI
Prettier
Concurrently – Run frontend & backend together
🧠 Architecture & Approach

This project follows modern Angular best practices:

Standalone Components – No NgModules overhead
Reactive State Management (NgRx) – Predictable data flow
Signals (where applicable) – Efficient UI updates
Zone-less Testing – Faster and more predictable tests using Vitest
Separation of Concerns – Clear distinction between UI, state, and API layers
📦 Installation

Clone the repository and install dependencies:

npm install
▶️ Running the Application
Start both frontend and backend:
npm start

This runs:

Angular dev server
Express API server
Run frontend only:
npm run serve
Run backend only:
npm run serve-api
🧪 Running Tests
npm test

Tests are powered by Vitest and run without Zone.js for better performance and simplicity.

🏗️ Build
npm run build
👀 Development Notes

The backend is a lightweight Express server located in:

src/backend/server.js
The frontend follows a feature-based structure for scalability
State is managed centrally using NgRx
Styling is handled via Tailwind + Angular Material
