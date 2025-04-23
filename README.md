# Notewise

Notewise is a comprehensive note-taking application built with modern web technologies. It allows users to create, edit, organize, and search notes with a clean and intuitive interface.

## 🌟 Features

- **User Authentication**
  - Email/Password sign up and login
  - Google OAuth integration
  - Secure session management

- **Note Management**
  - Create and edit notes with rich text formatting
  - Organize notes into folders
  - Star important notes for quick access
  - View recently edited notes
  - Real-time saving and synchronization

- **Advanced Functionality**
  - Full-text search across all notes
  - AI-powered note summarization using Gemini API
  - Markdown support
  - Tagging system

- **User Experience**
  - Responsive design for mobile and desktop
  - Dark/light mode toggle
  - Customizable settings
  - Keyboard shortcuts for power users

## 🚀 Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for production
  - [TypeScript](https://www.typescriptlang.org/) - Static type checking
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [shadcn/ui](https://ui.shadcn.com/) - Re-usable component library

- **Backend:**
  - [Supabase](https://supabase.io/) - Open source Firebase alternative
    - Authentication
    - PostgreSQL database
    - Real-time subscriptions
    - Storage

- **APIs:**
  - [Gemini API](https://ai.google.dev/) - AI-powered note summarization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later)
- npm or yarn or pnpm

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jayesh9747/Notewise.git
   cd Notewise
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
Notewise/
├── app/                  # Next.js app router
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── notes/            # Notes pages
│   └── settings/         # Settings page
├── components/           # Reusable UI components
├── lib/                  # Utility functions and libraries
│   ├── supabase/         # Supabase client and helpers
│   └── gemini/           # Gemini API integration
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🌐 Deployment

The application is deployed at [https://notewise-v1.netlify.app](https://notewise-v1.netlify.app)

### Deployment Steps:

1. Create a Supabase project and set up the necessary tables and authentication providers
2. Configure environment variables on your hosting provider
3. Build and deploy the application:
   ```bash
   npm run build
   npm run start
   ```

## 🔒 Authentication Setup

### Supabase Configuration:
1. Create a new project in Supabase
2. Configure Email & Password authentication
3. Set up Google OAuth provider:
   - Create credentials in Google Cloud Console
   - Add authorized redirect URIs for both development and production environments
   - Add Google OAuth credentials to Supabase

### Google OAuth Redirect URIs:
- Development: `http://localhost:3000/auth/callback`
- Production: `https://notewise-v1.netlify.app/auth/callback`

## 📝 Database Schema

### Users Table
- Managed by Supabase Auth

### Notes Table
```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB,
  is_starred BOOLEAN DEFAULT false,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Folders Table
```sql
CREATE TABLE folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🧠 AI Summarization

Notewise uses Google's Gemini API to provide AI-powered summarization of notes. This feature helps users quickly understand the key points of lengthy notes.

### Usage:
1. Open any note
2. Click the "Summarize" button
3. Wait for the AI to process and generate a summary
4. View the summarized content

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e
```

## 🔧 Troubleshooting

### OAuth Callback Issues
If you're experiencing issues with OAuth callbacks:
1. Verify that the correct redirect URLs are configured in both Google Console and Supabase settings
2. Check that your deployed application is using HTTPS
3. Ensure that `window.location.origin` is correctly pointing to your production URL

## 📈 Roadmap

- [ ] Collaborative editing
- [ ] Offline support
- [ ] Mobile applications (React Native)
- [ ] Advanced AI features (categorization, related notes)
- [ ] Export/import functionality
- [ ] Custom templates

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jayesh Savaliya**
- GitHub: [@jayesh9747](https://github.com/jayesh9747)
- Email: savaliyajayesh2405@gmail.com

## 🙏 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Google Gemini API](https://ai.google.dev/)
