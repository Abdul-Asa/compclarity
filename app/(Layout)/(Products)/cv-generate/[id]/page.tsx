import { getUser } from "@/lib/actions/server-actions";
import { redirect } from "next/navigation";
import { getCV } from "@/lib/actions/server-actions";
import dynamic from "next/dynamic";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Link from "next/link";

const CVBuilder = dynamic(() => import("@/components/cv-builder"), {
  ssr: false,
});

export default async function CVBuilderPage({ params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const cv = await getCV(params.id);
  if (!cv) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen gap-4 p-4">
        <h1 className="text-4xl font-bold ">CV Not Found</h1>
        <p>The CV you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/cv-generate"
          className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          tabIndex={0}
          aria-label="Return to CV Dashboard"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cv", params.id],
    queryFn: () => getCV(params.id),
  });

  return (
    <div className="w-full h-screen p-2 mx-auto sm:p-4 max-w-screen-2xl">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CVBuilder />
      </HydrationBoundary>
    </div>
  );
}
