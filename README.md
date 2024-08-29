# CompClarity

This is the frontend for [Compclarity](https://compclarity.com). It is a Next.js application deployed on Amplify.

## File Structure

```
compclarity/
├── app/
│   ├── (AppTracker)/ (for the job application tracker)
│   ├── (Auth)/ (for the authentication)
│   ├── (Navigation)/ (for the navigation)
│   ├── (Tables)/ (for the tables)
│   ├── hero-items.tsx (components for the landing page)
│   ├── layout.tsx (for the layout of the app)
│   └── page.tsx (for the page)
├── components/
│   ├── kanban/ (for the job application tracker)
│   ├── Layout/ (for the layout of the app)
│   └── ui/ (for the UI components)
├── config/ (includes helper functions, constants)
├── lib/
│   ├── supabase/
│   ├── data.ts (for the server-only data)
│   ├── types.ts (for the types)
│   └── utils.ts (for the utility functions)
├── public/
├── styles/
│   └── globals.css
├── .env.local
├── next.config.mjs
├── package.json
└── tailwind.config.ts
```

## Running Locally

To run the project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/compclarity.git compclarity && cd compclarity
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up [environment variables](#environment-variables)

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory and paste the variables. Check the Discord for the variables.

## Technologies Used

- Next.js
- Tailwind CSS
- Supabase
- Amplify
