"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export const useUser = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                return { isSignedIn: false, user: null };
            }

            const { data: profile } = await supabase
                .from("users")
                .select("*")
                .eq("id", user.id)
                .single();

            return {
                isSignedIn: true,
                user: profile,
            };
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        isSignedIn: data?.isSignedIn ?? false,
        user: data?.user ?? null,
        isLoading,
    };
};
