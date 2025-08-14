import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { BarChart3 } from "lucide-react";
import { ResponsiveContainer, Sankey, Tooltip, Layer, Rectangle } from "recharts";
import { ApplicationObject } from "@/lib/validation/types";
import Logo from "@/components/layout/Logo";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";

interface ExportSankeyModalProps {
  applications: ApplicationObject[];
}

// Update COLORS to match the requested mapping:
// Applied: grey, Screened: yellow, Interviewed: blue, Offer: green, Rejected: red
const COLORS = [
  "#9ca3af", // Applied - grey (tailwind gray-400)
  "#fde68a", // Screened - yellow (tailwind yellow-200)
  "#60a5fa", // Interviewed - blue (tailwind blue-400)
  "#34d399", // Offer - green (tailwind green-400)
  "#ef4444", // Rejected - red (tailwind red-500)
];

// Custom Sankey Node
const SankeyNode = ({ x, y, width, height, index, payload, containerWidth, links }: any) => {
  // Find if this node is used in any link
  const isActive = links.some((link: any) => link.source === index || link.target === index);
  if (!isActive) return null;

  const isOut = x + width / 2 > containerWidth / 2 ? "end" : "start";

  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle x={x} y={y} width={width} height={height} fill={COLORS[index % COLORS.length]} fillOpacity="1" />
      <text
        textAnchor={isOut}
        x={isOut === "start" ? x - 10 : x + width + 10}
        y={y + height / 2}
        fontSize="16"
        stroke="#fff"
        strokeWidth="4"
        paintOrder="stroke"
        style={{ fontWeight: 700 }}
        dy="0.355em"
      >
        {payload.name}: {payload.value}
      </text>
    </Layer>
  );
};

export function ExportSankeyModal({ applications }: ExportSankeyModalProps) {
  const [open, setOpen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const sankeyData = transformApplicationsToSankey(applications);
  const hasLinks = sankeyData.links.length > 0;

  const handleDownload = async () => {
    if (chartRef.current) {
      const dataUrl = await toPng(chartRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = "CompClarity Tracker - Application Flow.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Application Flow Chart"
      className="lg:max-w-[80vw] max-h-[80vh] size-full"
      trigger={
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <BarChart3 className="w-4 h-4 mr-2" />
          Export chart
        </Button>
      }
    >
      <div className="size-full overflow-scroll">
        {hasLinks ? (
          <>
            <div className="flex justify-end mb-2">
              <Button size="sm" variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
            <div ref={chartRef} className="size-full bg-card p-2 ">
              <ResponsiveContainer height={500} width="100%">
                <Sankey
                  data={sankeyData}
                  node={<SankeyNode links={sankeyData.links} nodes={sankeyData.nodes} />}
                  nodeWidth={20}
                  nodePadding={14}
                  linkCurvature={0.5}
                  link={{ stroke: "#7dd3fc", strokeOpacity: 0.5 }}
                  margin={{ top: 20, right: 70, bottom: 20, left: 20 }}
                >
                  <Tooltip
                    formatter={(value: number, name: string) => [`${name}: ${value} applications`]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      padding: "12px",
                    }}
                    labelStyle={{ color: "#374151" }} // gray-700
                    itemStyle={{ color: "#374151" }}
                  />
                </Sankey>
              </ResponsiveContainer>
              <div className="mt-6 flex items-center justify-center opacity-60 text-xs">
                <span className="mr-2">Made by</span>
                <Logo withText={false} className="h-5 w-auto" />
                <span className="font-semibold">CompClarity</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center">
            There is not enough data to generate a chart. Please add more applications or update their statuses.
          </p>
        )}
      </div>
    </Modal>
  );
}

function transformApplicationsToSankey(applications: ApplicationObject[]) {
  // Map todo_level to status name
  const statusMap = {
    "0": "Applied",
    "1": "Screened",
    "2": "Interviewed",
    "3": "Offer",
    "4": "Rejected",
  } as const;

  // Cumulative counts for each stage
  let n_applied = 0;
  let n_screened = 0;
  let n_interviewed = 0;
  let n_offer = 0;
  let n_rejected = 0;

  applications.forEach((app) => {
    const level = Number(app.todo_level);
    if (level === 4) {
      // Rejected only increments Applied and Rejected
      n_applied++;
      n_rejected++;
    } else {
      // For 0-3, increment all stages up to and including their level
      n_applied++;
      if (level >= 1) n_screened++;
      if (level >= 2) n_interviewed++;
      if (level >= 3) n_offer++;
    }
  });

  const nodes = [
    { name: `Applied`, value: n_applied },
    { name: `Screened`, value: n_screened },
    { name: `Interviewed`, value: n_interviewed },
    { name: `Offer`, value: n_offer },
    { name: `Rejected`, value: n_rejected },
  ];

  // Link values are the number that advanced from one stage to the next
  // (i.e., Screened = all with level >= 1, Interviewed = all with level >= 2, etc.)
  const links = [
    { source: 0, target: 1, value: n_screened }, // Applied → Screened
    { source: 1, target: 2, value: n_interviewed }, // Screened → Interviewed
    { source: 2, target: 3, value: n_offer }, // Interviewed → Offer
    { source: 0, target: 4, value: n_rejected }, // Applied → Rejected
  ].filter((link) => link.value > 0);

  return { nodes, links };
}
