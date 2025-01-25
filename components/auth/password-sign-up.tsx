// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { PasswordSignUpSchema } from "@/lib/validation/types";
// import { passwordSignUpSchema } from "@/lib/validation/schema";
// import { signUp } from "@/lib/actions/server-actions";
// import { useToast } from "@/lib/hooks/useToast";
// import { useAction } from "next-safe-action/hooks";
// import { useRouter } from "next/navigation";

// interface PasswordSignUpProps {
//   className?: string;
// }

// export function PasswordSignUp({ className }: PasswordSignUpProps) {
//   const { execute, isPending, hasErrored, hasSucceeded } = useAction(signUp);
//   const router = useRouter();
//   const { toast } = useToast();

//   const form = useForm<PasswordSignUpSchema>({
//     resolver: zodResolver(passwordSignUpSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const handleSignUp = async (values: PasswordSignUpSchema) => {
//     await execute(values);
//     if (hasErrored) {
//       toast({
//         title: "Error",
//         description: "An error occurred while signing up",
//         variant: "destructive",
//       });
//     }
//     if (hasSucceeded) {
//       toast({
//         title: "Success",
//         description: "Check your email for a verification link",
//       });
//       router.push("/auth/sign-in");
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSignUp)}>
//         <div className={cn("flex flex-col space-y-4", className)}>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <FormField
//               control={form.control}
//               name="firstName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>First Name</FormLabel>
//                   <FormControl>
//                     <Input {...field} autoComplete="given-name" placeholder="John" />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lastName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Last Name</FormLabel>
//                   <FormControl>
//                     <Input {...field} autoComplete="family-name" placeholder="Doe" />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>

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
//                   <Input placeholder="••••••••" type="password" autoComplete="new-password" {...field} toggleAllowed />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="confirmPassword"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Confirm Password</FormLabel>
//                 <FormControl>
//                   <Input placeholder="••••••••" type="password" autoComplete="new-password" {...field} toggleAllowed />
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
