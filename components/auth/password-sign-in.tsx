// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { passwordSignIn } from "@/lib/actions/server-actions";
// import { useAction } from "next-safe-action/hooks";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/lib/hooks/useToast";

// const passwordSignInSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
// });

// type PasswordSignInSchema = z.infer<typeof passwordSignInSchema>;

// interface PasswordSignInProps {
//   className?: string;
// }

// export function PasswordSignIn({ className }: PasswordSignInProps) {
//   const { execute, isPending, hasErrored, hasSucceeded } = useAction(passwordSignIn);
//   const router = useRouter();
//   const { toast } = useToast();

//   const form = useForm<PasswordSignInSchema>({
//     resolver: zodResolver(passwordSignInSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const handleSignIn = async (values: PasswordSignInSchema) => {
//     await execute(values);
//     if (hasErrored) {
//       toast({
//         title: "Error",
//         description: "An error occurred while signing in",
//         variant: "destructive",
//       });
//     }
//     if (hasSucceeded) {
//       router.push("/");
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSignIn)}>
//         <div className={cn("flex flex-col space-y-4", className)}>
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="john@doe.com"
//                     {...field}
//                     type="email"
//                     autoCapitalize="none"
//                     autoComplete="email"
//                     autoCorrect="off"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="••••••••"
//                     type="password"
//                     autoComplete="current-password"
//                     {...field}
//                     toggleAllowed
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" disabled={isPending} loading={isPending}>
//             Continue
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
