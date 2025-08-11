"use client";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, BarChart3, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { AddApplicationModal } from "./add-application-modal";
import { DeleteRejectedApplicationsModal } from "./delete-rejected-applications-modal";
import { DeleteAllApplicationsModal } from "./delete-all-applications-modal";
import { trpc } from "@/lib/trpc/client";
import { toast } from "@/lib/hooks/use-toast";
import { ExportSankeyModal } from "./export-sankey-modal";
import { ApplicationObject } from "@/lib/validation/types";
interface KanbanHeaderProps {
  applications: ApplicationObject[];
}

export function KanbanHeader({ applications }: KanbanHeaderProps) {
  const exportCsvQuery = trpc.application.exportCSV.useQuery(undefined, { enabled: false });

  const handleExportCsv = async () => {
    toast({
      title: "Exporting...",
      description: "Generating your CSV file.",
      variant: "info",
    });
    try {
      const { data: csv, error } = await exportCsvQuery.refetch();
      if (error) {
        toast({ title: "Export failed", description: error?.message || "Could not export CSV.", variant: "error" });
        return;
      }
      if (!csv) {
        toast({ title: "No data", description: "No applications to export.", variant: "warning" });
        return;
      }
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CompClarity-JobTracker.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast({ title: "Exported", description: "CSV file downloaded.", variant: "success" });
    } catch (error: any) {
      toast({ title: "Export failed", description: error?.message || "Could not export CSV.", variant: "error" });
    }
  };

  return (
    <div>
      {/* Responsive Header Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        {/* Title and Job Count */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Your Job Tracker</h1>
          <span className="text-sm font-medium text-gray-600">{applications.length} TOTAL</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-2 sm:gap-2">
          <AddApplicationModal />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <EllipsisVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[240px]" sideOffset={10} align="end">
              <DropdownMenuLabel>
                <p className="text-xs text-muted-foreground">Exports</p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup className="flex flex-col gap-1 py-2">
                <DropdownMenuItem asChild>
                  <ExportSankeyModal applications={applications} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                    onClick={handleExportCsv}
                    loading={exportCsvQuery.isFetching}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export .csv
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-1 py-2">
                <DropdownMenuItem asChild>
                  <DeleteRejectedApplicationsModal />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <DeleteAllApplicationsModal />
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search and Filters */}
      {/* <div className="flex flex-col gap-2 mb-4 w-full">
        <div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4 md:justify-between">
          <div className="relative w-full sm:flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for roles or companies"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10 w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 bg-muted rounded-md items-center justify-center md:px-2 py-1 w-full ">
            <DatePicker
              value={filters.from}
              onChange={(_, formatted) => setFilters({ ...filters, from: formatted })}
              placeholder="Applied from"
            />
            <span className="mx-1 text-muted-foreground">→</span>
            <DatePicker
              value={filters.to}
              onChange={(_, formatted) => setFilters({ ...filters, to: formatted })}
              placeholder="Applied to"
            />
          </div>

          <div className="flex w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="icon"
              className="size-10"
              tooltip="Clear filters"
              onClick={() => {
                setFilters(null);
              }}
            >
              <FunnelX className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div> */}
      <Separator className="mb-4" />
    </div>
  );
}
