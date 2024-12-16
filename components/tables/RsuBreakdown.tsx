import { CurrencyCode } from "@/lib/validation/types";
import { formatter } from "@/lib/utils";
import TimelineBar from "./TimelineBar";

interface RsuBreakdownProps {
  percentage?: string;
  rsu?: number;
  currency: CurrencyCode;
}

export const RsuBreakdown = ({ percentage, rsu, currency }: RsuBreakdownProps) => {
  const parsedPercentage = percentage?.split(",").map(Number);

  let nextPercentage = 0;
  let runningPercentage = 0;

  return parsedPercentage && rsu && rsu > 0 ? (
    <div className="px-4 py-1 space-y-3 block w-full border rounded-md mt-2 mb-2">
      <div className="font-bold block">Equity Breakdown:</div>
      {parsedPercentage?.map((curPercentage, i) => {
        if (nextPercentage > 0) {
          runningPercentage = nextPercentage;
        }
        nextPercentage += curPercentage;
        return (
          <div key={i} className="flex flex-col w-full">
            <div className="flex justify-between">
              <div className="text-left">
                Year {i + 1} <span className="text-xs">({curPercentage}%)</span>
              </div>

              <div className="text-right">{`${formatter(currency).format((curPercentage / 100) * rsu!)}`}</div>
            </div>

            <TimelineBar startPercentage={runningPercentage} endPercentage={nextPercentage} />
          </div>
        );
      })}
    </div>
  ) : null;
};
