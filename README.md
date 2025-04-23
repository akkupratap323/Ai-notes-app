Mini AI-Powered Notes App - README

![ai notes screenshot](https://github.com/user-attachments/assets/f6eb0879-c7ab-4ff2-9d69-bb1d59ffaf66)


Overview
A modern notes application with AI-powered summarization features, built with Next.js, Supabase, and DeepSeek AI API. This app allows users to create, edit, and delete notes while offering smart summarization capabilities.

Features
🔐 Secure Authentication (Email/Password & Google OAuth)

📝 CRUD Operations for notes

🧠 AI Summarization using DeepSeek API

⚡ Blazing Fast with React Query caching

🎨 Beautiful UI with Shadcn components

📱 Fully Responsive design

Tech Stack
Frontend:

Next.js 14 (App Router)

TypeScript

Tailwind CSS

Shadcn UI Components

Backend:

Supabase (Auth & Database)

DeepSeek AI API

State Management:

React Query (TanStack Query)

Live Demo
The app is deployed on Vercel:
Vercel

Getting Started
Prerequisites
Node.js v18+

npm or yarn

Supabase account

DeepSeek API key (free tier available)

Installation
Clone the repository:

bash
git clone https://github.com/your-username/ai-notes-app.git
cd ai-notes-app
Install dependencies:

bash
npm install
# or
yarn install
Set up environment variables:
Create a .env.local file in the root directory with the following:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
DEEPSEEK_API_KEY=your-deepseek-api-key
Run the development server:

bash
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser.

Project Structure
ai-notes-app/
├── app/                    # Next.js app router
│   ├── (auth)/             # Authentication routes
│   ├── (main)/             # Protected routes
│   ├── api/                # API routes
│   └── ...                 # Other app files
├── components/             # Reusable components
├── lib/                    # Utility functions
├── public/                 # Static assets
├── styles/                 # Global styles
├── types/                  # TypeScript types
└── ...                     # Configuration files
Key Implementation Details
Authentication: Implemented using Supabase Auth with both email/password and Google OAuth providers.

Data Management: Notes are stored in Supabase database with real-time updates using Supabase's JavaScript client.

AI Integration: DeepSeek API is used for summarizing notes. The summarization is triggered on-demand with a button click.

State Management: React Query handles all data fetching, caching, and synchronization with the backend.

UI Components: Built with Shadcn UI for a consistent, accessible design system.

Screenshots
*(Include 2-3 screenshots here with captions)*
Login Screen
Modern authentication interface

Notes Dashboard
Clean notes dashboard with AI summarization

Contributing
Contributions are welcome! Please open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Built with ❤️ by Aditya Pratap singh  
