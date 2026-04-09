# sub ai 🌿

> **An AI-powered ingredient substitution assistant for home cooks and bakers.**

sub ai helps you instantly find the best substitutes for any recipe ingredient — whether you've run out of eggs, need a dairy-free swap, or want to try something different. Just type the ingredient, and get a structured, chef-approved list of alternatives with ratios and tips.

---

## ✨ Features

- 🔍 **Instant ingredient substitution** — Get AI-generated substitutes for any food ingredient, fruit, or vegetable
- 📋 **Structured results** — Each suggestion includes the substitute name, usage ratio, and helpful notes
- 💡 **Chef tips** — Contextual baking/cooking tips to ensure the best results with each substitute
- 🔤 **Smart spell correction** — Catches common misspellings and suggests the correct ingredient
- ⚠️ **Input validation** — Gracefully handles non-food inputs with clear error feedback
- 🕓 **Chat history** — Browse and revisit your past ingredient queries
- ⭐ **Starred results** — Save and revisit your favourite substitutions
- ⚙️ **Settings** — Customize your experience
- 🌗 **Light / Dark / System theme** — Full theme support with persistent preference
- 🔐 **Authentication** — Sign up and sign in to sync your history and saved items

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, CSS variables |
| UI Components | shadcn/ui, Lucide React |
| AI Backend | [Groq](https://groq.com/) — `llama-3.3-70b-versatile` |
| Fonts | Geist Sans, Geist Mono (Google Fonts) |
| Notifications | Sonner (toast notifications) |
| Auth | Custom auth forms (sign-in / sign-up) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Groq API key](https://console.groq.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/sub-ai.git
cd sub-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Add your Groq API key to `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
app/
├── (auth)/
│   ├── sign-in/         # Sign-in page
│   └── sign-up/         # Sign-up page
├── (root)/
│   ├── dashboard/       # Main ingredient search UI
│   ├── history/         # Chat/query history
│   ├── starred/         # Saved/starred results
│   ├── profile/         # User profile (coming soon)
│   └── setting/         # App settings (theme, preferences)
├── api/
│   └── chat/            # POST endpoint — calls Groq LLM
├── context/
│   ├── ThemeContext.tsx  # Light/dark/system theme provider
│   └── UserContext.tsx   # Global user state provider
├── globals.css           # Tailwind config + custom design tokens
└── layout.tsx            # Root layout with ThemeProvider & Toaster
```

---

## 🤖 How the AI Works

When you enter an ingredient, the app sends a `POST` request to `/api/chat`, which calls the **Groq API** using the `llama-3.3-70b-versatile` model. The model is prompted to act as a chef assistant and return structured JSON in one of three formats:

**✅ Valid ingredient:**
```json
{
  "status": "success",
  "correction": "",
  "ingredient": "eggs",
  "substitutes": [
    {
      "name": "Flaxseed meal",
      "ratio": "1 tbsp + 3 tbsp water",
      "notes": "Let it sit to thicken before use."
    }
  ],
  "tips": ["Reduce liquid if using moist substitutes."]
}
```

**🔤 Corrected spelling:**
```json
{
  "status": "success",
  "correction": "Did you mean 'yeast'?",
  "ingredient": "yeast",
  "substitutes": [...],
  "tips": [...]
}
```

**❌ Invalid input:**
```json
{
  "status": "error",
  "incorrectInput": "hello",
  "message": "hello is not a valid ingredient."
}
```

---

## 🌗 Theme Support

sub ai supports three theme modes managed through a custom React context:

- **Light** — Clean white interface
- **Dark** — Easy on the eyes
- **System** — Automatically follows your OS preference

Theme preference is persisted to `localStorage` and applied immediately on load with no flash.

---

## 👥 Builders

- **Quake**
- **xblank** — [Portfolio](https://fortunate-portfolio.vercel.app)

---

## 📄 License

This project is open source. See [LICENSE](./LICENSE) for details.
