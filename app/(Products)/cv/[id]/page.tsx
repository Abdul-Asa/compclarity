import type { Metadata } from "next";
import { CVServiceForm } from "./CVForm";
import { getTier } from "../product";

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = getTier(params.id)?.title;
  if (!title)
    return {
      title: "CompClarity - CV Writing",
      description: "Get professional CV writing services from CompClarity and boost your career prospects!",
    };
  return {
    title: `CompClarity - ${title}`,
    description: `Get professional ${title.toLowerCase()} services from CompClarity and boost your career prospects!`,
  };
}

// async function getStripeSession(sessionId: string | undefined) {
//   if (!sessionId) return null;
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/checkout?session_id=${sessionId}`);
//   return response.json();
// }

const Page = async ({ params, searchParams }: PageProps) => {
  // const session = await getStripeSession(searchParams.session_id);
  return <CVServiceForm serviceId={params.id} />;
};

export default Page;
