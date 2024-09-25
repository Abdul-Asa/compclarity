import type { Metadata } from "next";
import { CVServiceForm } from "./CVForm";

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = params.id === "cv-writing" ? "CV Writing" : "Interview Coaching";
  return {
    title: `CompClarity - ${title}`,
    description: `Get professional ${title.toLowerCase()} services from CompClarity and boost your career prospects!`,
  };
}

async function getStripeSession(sessionId: string | undefined) {
  if (!sessionId) return null;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/checkout?session_id=${sessionId}`);
  return response.json();
}

const Page = async ({ params, searchParams }: PageProps) => {
  const session = await getStripeSession(searchParams.session_id);
  return <CVServiceForm serviceId={params.id} session={session} />;
};

export default Page;
