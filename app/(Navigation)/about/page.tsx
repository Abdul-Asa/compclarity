import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CompClarity - About Us",
  description:
    "CompClarity's mission is dedicated to demystifying compensation packages across Europe, starting with the tech industry, by ensuring that you have all the information required to understand your worth and make informed decisions.",
};

export default function About() {
  return (
    <div className="mx-5 mt-4 flex flex-col items-center justify-center gap-7 sm:mx-auto sm:w-3/5">
      <div className="flex flex-col items-center justify-center text-center">
        <h1>
          Welcome to <span className="font-black">CompClarity</span>!
        </h1>
        <p>
          <i>Your Guide to Fair Pay from Day One</i>
        </p>
        <p className="center font-open mt-5 whitespace-pre-line text-pretty text-center text-sm leading-loose">
          People work for money, so it&apos;s time we stop pretending otherwise.
          In a world where salary discussions are shrouded in secrecy,
          CompClarity shines a light of transparency, empowering professionals
          with the knowledge they need to navigate their careers. Our platform
          is dedicated to demystifying compensation packages across the tech and
          finance industries in Europe, ensuring that you have all the
          information required to know your worth and make informed decisions.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="uppercase underline">How It Works</h2>
        <p className="center font-open mt-5 whitespace-pre-line text-pretty text-center text-sm leading-loose">
          CompClarity is built on the foundation of community-driven data
          sharing. Users are encouraged to share a breakdown of their salaries,
          including base pay, bonuses, stock options, and other benefits. This
          crowd-sourced approach not only ensures a wide-ranging dataset but
          also keeps our information current and reflective of the ever-evolving
          landscape.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="uppercase underline">FAQs</h2>
        <ul className="font-open mt-5 list-none space-y-5 whitespace-pre-line text-pretty text-sm leading-loose">
          <li className="mb-2 text-center">
            <span className="font-space font-bold underline">Question:</span> My
            salary/offer has been already shared by someone else, should I share
            it again? <br />{" "}
            <span className="font-space font-bold underline">Answer:</span> Yes!
            The more data we have, the more accurate our insights will be.
          </li>
          <li className="mb-2 text-center">
            <span className="font-space font-bold underline">Question:</span>{" "}
            What does verified mean? How can I verify my salary? <br />
            <span className="font-space font-bold underline">Answer:</span>{" "}
            Verified means that the submission has been confirmed to be
            authentic. To verify, simply attach a copy of your offer letter
            during submission. It will then be marked as verified.
          </li>
          <li className="text-center">
            <span className="font-space font-bold underline">Question:</span>{" "}
            How accurate are the submissions? <br />
            <span className="font-space font-bold underline">Answer:</span> We
            do our best to ensure the accuracy of the data on our platform.
            However, we cannot guarantee the accuracy of every submission.
            Therefore, we encourage people to verify their submission when
            sharing their salary.
          </li>
        </ul>
      </div>
    </div>
  );
}
