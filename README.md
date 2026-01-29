# foedr.

**Fördermittel. Automatisiert.**

Die intelligente Plattform für Fördermittel im deutschen Mittelstand.

## 🚀 Features

- **Smart Matching**: KI-gestützte Zuordnung von 2.500+ Förderprogrammen
- **Fristen-Alerts**: Nie wieder eine Deadline verpassen
- **Antragsvorbereitung**: Checklisten und Dokument-Management
- **Dashboard**: Übersicht über Potenzial und Status

## 🛠 Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: Clerk
- **AI**: OpenAI GPT-4o
- **Hosting**: Vercel

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/yourusername/foedr.git
cd foedr

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Fill in your values

# Setup database
npm run db:generate
npm run db:push

# Run development server
npm run dev
```

## 🔧 Environment Variables

See `.env.example` for all required variables.

**Required:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API key

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── auth/           # Login/Signup pages
│   ├── dashboard/      # Main dashboard
│   ├── matches/        # Program matches
│   ├── applications/   # Application tracking
│   └── onboarding/     # Company setup wizard
├── components/
│   ├── ui/             # Base UI components
│   ├── forms/          # Form components
│   └── dashboard/      # Dashboard components
├── lib/
│   ├── db/             # Prisma client
│   ├── ai/             # OpenAI helpers
│   └── matching/       # Scoring engine
└── prisma/
    └── schema.prisma   # Database schema
```

## 🚢 Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## 📝 License

Private - All rights reserved.

---

Built with ❤️ for the German Mittelstand.
