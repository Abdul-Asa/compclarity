import type { Metadata } from "next";
import { CVServiceForm } from "./CVForm";
interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = params.id === "cv-writing" ? "CV Writing" : "Interview Coaching";
  return {
    title: `CompClarity - ${title}`,
    description: `Get professional ${title.toLowerCase()} services from CompClarity and boost your career prospects!`,
  };
}

const Page = async ({ params }: PageProps) => {
  return <CVServiceForm serviceId={params.id} />;
};

export default Page;
