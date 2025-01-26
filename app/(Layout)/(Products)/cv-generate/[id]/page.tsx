import { getUser } from "@/lib/actions/server-actions";
import { redirect } from "next/navigation";
import { getCV } from "@/lib/actions/server-actions";
import dynamic from "next/dynamic";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const CVBuilder = dynamic(() => import("@/components/cv-builder"), {
  ssr: false,
});

export default async function CVBuilderPage({ params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
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
