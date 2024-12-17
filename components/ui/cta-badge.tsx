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
  const Bar = (
    <Badge
      variant={"outline"}
      className="font-inter rounded-full w-fit bg-background origin-top-left cursor-default gap-2 border border-foreground dark:border-ring-dark p-0.5 font-open font-light transition-transform group-hover:-rotate-3"
    >
      <Badge className="bg-primary uppercase">{intro}</Badge>
      {main && <p className="pr-3 line-clamp-1">{main} </p>}
    </Badge>
  );
  return (
    <div className="group relative rounded-full bg-primary w-fit">
      {link ? (
        <Link href={link} target={target} className="cursor-pointer">
          {Bar}
        </Link>
      ) : (
        Bar
      )}
    </div>
  );
};

export default CTABadge;
