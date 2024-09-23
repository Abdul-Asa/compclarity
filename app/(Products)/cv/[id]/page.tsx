import type { Metadata } from "next";
import { CVServiceForm } from "./CVForm";
import StripePayment from "./stripe-embed";
import { createStripeSession } from "./action";

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
  const options = await createStripeSession();
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* <Stepper /> */}
      <div className="flex-1 flex justify-center container mx-auto p-5">
        <div className="bg-white dark:bg-black flex flex-col max-w-screen-md items-center w-full p-4 rounded-sm md:p-10">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold">CV writing</h1> {/* get Service Name from ID */}
            <p>
              Our CV writing service is designed to help you stand out in the job market. Our team of experts will work
              with you to create a CV that highlights your skills and experience, and makes you stand out from the
              competition.
            </p>
            {/* get Service Description from ID */}
            <StripePayment options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
