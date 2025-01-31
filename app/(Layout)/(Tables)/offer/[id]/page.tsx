import type { Metadata } from "next";
import Link from "next/link";
import { OfferRowContent } from "@/components/tables/OfferRowContent";
import { fetchOffer, fetchFinanceOffer } from "@/lib/actions/data";

interface pageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: pageProps): Promise<Metadata> {
  let offer;
  try {
    offer = await fetchOffer(params.id);
  } catch (error) {
    offer = await fetchFinanceOffer(params.id);
  }

  return {
    title: `Offer Details - ${offer.company.name}`,
    description: `Check out how much a ${offer.title} earns at ${offer.company.name}! Brought to you by CompClarity, your guide to fair pay from day one.`,
  };
}

const page = async ({ params }: pageProps) => {
  let offer;
  try {
    offer = await fetchOffer(params.id);
  } catch (error) {
    offer = await fetchFinanceOffer(params.id);
  }

  const addedDateStr = offer.addedDate.toLocaleDateString("en-UK");

  return (
    <>
      <div className="bg-white dark:bg-black dark:border-border dark:border p-16 sm:pr-40 sm:pl-40">
        <OfferRowContent addedDateStr={addedDateStr} offer={offer} />
        <div className="mt-4 flex justify-center">
          <Link href="/tech">
            <button className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black text-sm py-2 px-2 rounded mt-4">
              View All Salaries
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
