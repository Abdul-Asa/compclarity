import { CoverLetterForm } from "./CoverLetterForm";

export default function CoverLetter() {
  return (
    <div className="flex min-h-screen w-full p-4">
      <div className="flex-1 flex justify-center container relative flex-col items-center mx-auto p-5">
        <h1 className="max-w-4xl animate-fade-in text-wrap p-2 text-center text-2xl font-bold tracking-tight transition lg:text-5xl">
          <span className="inline-block text-emerald-700 dark:text-emerald-500 transition hover:-translate-y-1">
            AI
          </span>{" "}
          Cover Letter Generator
        </h1>
        <p className="max-w-4xl animate-fade-in text-wrap p-2 text-center text-lg font-normal tracking-tight transition lg:text-2xl">
          Generate a cover letter in seconds with our AI-powered cover letter generator.
        </p>

        <CoverLetterForm />
      </div>
    </div>
  );
}
