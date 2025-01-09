import { Button } from "@/components/ui/button";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowSmallUpIcon,
  ArrowSmallDownIcon,
  TrashIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export const ShowIconButton = ({ show, setShow }: { show: boolean; setShow: (show: boolean) => void }) => {
  const tooltipText = show ? "Hide section" : "Show section";
  const Icon = show ? EyeIcon : EyeSlashIcon;

  return (
    <Button variant="ghost" size="icon" onClick={() => setShow(!show)} title={tooltipText}>
      <Icon className="h-6 w-6" aria-hidden="true" />
      <span className="sr-only">{tooltipText}</span>
    </Button>
  );
};

type MoveIconButtonType = "up" | "down";
export const MoveIconButton = ({
  type,
  size = "medium",
  onClick,
}: {
  type: MoveIconButtonType;
  size?: "small" | "medium";
  onClick: (type: MoveIconButtonType) => void;
}) => {
  const tooltipText = type === "up" ? "Move up" : "Move down";
  const Icon = type === "up" ? ArrowSmallUpIcon : ArrowSmallDownIcon;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onClick(type)}
      title={tooltipText}
      className={cn(size === "small" && "h-8 w-8 [&_svg]:size-4")}
    >
      <Icon aria-hidden="true" />
      <span className="sr-only">{tooltipText}</span>
    </Button>
  );
};

export const DeleteIconButton = ({ onClick, tooltipText }: { onClick: () => void; tooltipText: string }) => {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} title={tooltipText} className="h-8 w-8 [&_svg]:size-4">
      <TrashIcon aria-hidden="true" />
      <span className="sr-only">{tooltipText}</span>
    </Button>
  );
};

export const BulletListIconButton = ({
  onClick,
  showBulletPoints,
}: {
  onClick: (newShowBulletPoints: boolean) => void;
  showBulletPoints: boolean;
}) => {
  const tooltipText = showBulletPoints ? "Hide bullet points" : "Show bullet points";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onClick(!showBulletPoints)}
      title={tooltipText}
      className={cn("size-6 [&_svg]:size-4", showBulletPoints && "bg-primary hover:bg-primary/90")}
    >
      <ListBulletIcon className={cn(showBulletPoints ? "text-gray-700" : "text-gray-400")} aria-hidden="true" />
      <span className="sr-only">{tooltipText}</span>
    </Button>
  );
};
