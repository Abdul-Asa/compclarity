'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { createClient } from "../supabase/client";
// import { introFormSchema } from "../validation/schema";
// import { actionClient } from "./safe-action";

// export const updateProfile = actionClient
//   .schema(introFormSchema)
//   .action(async ({ parsedInput: { firstName, lastName, } }) => {
//     const supabase = createClient();
//    const { data, error } = await supabase.auth.updateUser({
//       data: {
//         first_name: firstName,
//         last_name: lastName,
//       },
//     });
//     if (error) {
//         return {
//             error: error.message,
//         }
//     }
    
//     const { data: profileData, error: profileError } = await supabase.from('users').update({
//       first_name: firstName,
//       last_name: lastName,
//     }).eq('id', data.user?.id).select();   

//     if (profileError) {
//         return {
//             error: profileError.message,
//         }
//     }

//     return {
//       success: true,
//       data: profileData,
//     };
//   });

