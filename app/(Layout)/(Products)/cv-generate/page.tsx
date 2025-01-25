import { getCVData, getUser } from "@/lib/actions/server-actions";
import { redirect } from "next/navigation";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { CombinedCVData } from "@/components/cv-builder/types";
import { CreateCVButton } from "./create-cv";

export default async function CVBuilder() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/signin");
  }

  const cvs = await getCVData(user.id);

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
            const cvData = cv.cv_data as unknown as CombinedCVData;
            return (
              <Link href={`/cv-generate/${cv.id}`} key={cv.id} className="transition-opacity group hover:opacity-90">
                <div className="overflow-hidden border rounded-lg bg-card">
                  {/* Placeholder Image */}
                  <div className="relative aspect-[3/4] bg-muted">
                    <Image
                      src="/assets/cv-test.png"
                      alt={`CV - ${cvData.settings.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="mb-2 font-medium">{cvData.settings.name}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Created: {formatDate(cv.created_at)}</p>
                      <p>Updated: {formatDate(cv.updated_at)}</p>
                    </div>
                  </div>
                </div>
              </Link>
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
