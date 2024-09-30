import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "@/components/ui/star-rating";
import { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Edit the metadata for the page
export const metadata: Metadata = {
  title: "CompClarity - Tech Internship Guide",
  description:
    "Access to CompClarity's Guide to landing your first Software Engineering internship. Get insider tips and strategies for the internship application process.",
};

export default async function EbookPage() {
  const data = await fetch(
    "https://compclarity.gumroad.com/product_reviews?product_id=5r9qxjz_IWzLdk_Rhqya8A%3D%3D"
  ).then((res) => res.json());

  //fallback to 4.9 rating if no reviews are found
  const reviews = data.reviews || [
    {
      rating: 5,
    },
  ];

  const averageRating =
    reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / reviews.length;

  const cardContent = {
    title: "Tech Internship Guide",
    features: [
      "Insights into the application process",
      "CV and cover letter guidance",
      "Interview preparation tips",
      "Tips for standing out",
      "Return offer advice",
      "After sales support",
    ],
    price: "£11.99",
    buttonText: "Get the guide",
  };

  return (
    <div className="flex w-full flex-col scroll-smooth">
      <div className="mx-auto flex flex-col md:flex-row w-full items-center md:h-[calc(100vh-100px)] justify-center container gap-20 p-6 md:px-10 py-20">
        <div className="flex flex-col  justify-center gap-5">
          <h1 className="animate-fade-in text-left text-wrap text-5xl font-bold tracking-tight transition lg:text-7xl">
            <span className="inline-block text-emerald-700 dark:text-emerald-500 transition hover:-translate-y-3">
              Land
            </span>{" "}
            your dream{" "}
            <span className="inline-block text-emerald-700 dark:text-emerald-500 transition hover:-translate-y-3">
              internship.
            </span>
          </h1>{" "}
          <p className="text-xl ">
            Get insider tips and strategies for the internship application process. Learn how to stand out and secure
            internships at top tech companies.
          </p>{" "}
          {/* <div className="flex items-center space-x-4 j">
            <Image src="/assets/elliot.jpeg" alt="Profile" width={80} height={80} className="rounded-3xl" />
            <div>
              <p className=" font-medium">
                "This guide was a game-changer for my internship search. Highly recommend!"
              </p>
              <p className="">— Elliot, Software Engineer at JPMorgan</p>
            </div>
          </div> */}
        </div>{" "}
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">{cardContent.title}</h2>
            <div className="flex items-center mb-4">
              <StarRating rating={averageRating} activeColor="rgb(34 197 94)" />
              <span className="ml-2 text-gray-600">
                16 reviews
              </span>
            </div>
            <ul className="space-y-2 mb-6">
              {cardContent.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="text-3xl font-bold mb-4">{cardContent.price}</div>
            <Link
              href="https://compclarity.gumroad.com/l/guide"
              className={cn(buttonVariants({ variant: "default" }), " bg-emerald-700")}
              target="_blank"
            >
              {cardContent.buttonText}
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
