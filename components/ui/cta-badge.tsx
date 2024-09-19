import Link from "next/link";
import { Badge } from "./badge";

const CTABadge = ({
  main,
  link,
  intro,
  target = "_blank",
}: {
  main?: string;
  link?: string;
  target?: string;
  intro: string;
}) => {
  return link ? (
    <Link href={link} target={target} className="cursor-pointer">
      <Badge
        variant={"outline"}
        className="font-inter w-fit origin-top-left gap-2 border border-black dark:border-gray-200 bg-gray-50 dark:bg-gray-900 p-0.5 font-open font-light transition-transform group-hover:-rotate-3"
      >
        <Badge className="bg-emerald-700 dark:bg-emerald-500 uppercase">{intro}</Badge>
        {main && <p className="pr-3">{main} </p>}
      </Badge>
    </Link>
  ) : (
    <Badge
      variant={"outline"}
      className="font-inter w-fit origin-top-left cursor-default gap-2 border border-black dark:border-gray-200 bg-gray-50 dark:bg-gray-900 p-0.5 font-open font-light transition-transform group-hover:-rotate-3"
    >
      <Badge className="bg-emerald-700 dark:bg-emerald-500 uppercase">{intro}</Badge>
      {main && <p className="pr-3">{main} </p>}
    </Badge>
  );
};

export default CTABadge;
