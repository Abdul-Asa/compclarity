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

const Page = async ({ params, searchParams }: PageProps) => {
  const session = searchParams?.session_id
    ? await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/checkout?session_id=${searchParams.session_id}`).then(
        (res) => res.json()
      )
    : null;
  if (session) {
    return <CVServiceForm serviceId={params.id} session={session} />;
  } else {
    return <CVServiceForm serviceId={params.id} />;
  }
};

export default Page;
