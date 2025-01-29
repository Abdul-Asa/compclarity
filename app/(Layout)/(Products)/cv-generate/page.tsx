import { getCVs, getUser } from "@/lib/actions/server-actions";
import { redirect } from "next/navigation";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { CVData } from "@/components/cv-builder/types";
import { CreateCVButton } from "./create-cv";
import { Button } from "@/components/ui/button";
import { DeleteCVButton } from "./delete-cv";

export default async function CVBuilder() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const cvs = await getCVs();

  return (
    <div className="h-[calc(100vh-4rem)] p-2 sm:p-4 w-full container">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">My CVs</h1>
        <CreateCVButton />
      </div>

      {/* CV Grid */}
      {cvs && cvs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cvs.map((cv) => {
            const cvData = cv.cv_data as unknown as CVData;
            return (
              <div key={cv.id} className="overflow-hidden border rounded-lg bg-card">
                {/* Card Content */}
                <div className="p-4">
                  <h3 className="mb-2 font-medium">{cvData.settings.name}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Created: {formatDate(cv.created_at)}</p>
                    <p>Updated: {formatDate(cv.updated_at)}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/cv-generate/${cv.id}`}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <DeleteCVButton cvId={cv.id} cvName={cvData.settings.name} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="p-6 mb-4 rounded-full bg-muted">
            <PlusCircle className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-xl font-medium">No CVs Created Yet</h2>
          <p className="mb-6 text-muted-foreground">Create your first CV to get started</p>
        </div>
      )}
    </div>
  );
}
