"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateUserSchema } from "@/lib/validation/types";
import { updateUserSchema } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateUser } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SpinnerButton } from "@/components/Buttons/SpinnerButton";
import { toast } from "@/components/hooks/useToast";

interface AccountFormProps {
  userData: {
    email: string;
    first_name: string;
    last_name: string;
  };
}
export default function AccountForm({ userData }: AccountFormProps) {
  const router = useRouter();
  const [currentUserData, setCurrentUserData] = useState(userData);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: currentUserData.first_name,
      lastName: currentUserData.last_name,
    },
  });

  const onSubmit = async (data: UpdateUserSchema) => {
    const response = await updateUser(data);

    if (response.error) {
      console.error(response.message);
      toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      });
    } else {
      setCurrentUserData((prev) => ({
        ...prev,
        first_name: data.firstName,
        last_name: data.lastName,
      }));
      console.log(response.message);
      toast({
        title: "Success",
        description: response.message,
        variant: "constructive",
      });
    }
    router.refresh();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register("firstName")} autoComplete="on" />
          <p className="text-red-500 text-xs min-h-1 my-1">{errors.firstName?.message}</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register("lastName")} autoComplete="on" />
          <p className="text-red-500 text-xs min-h-1 my-1">{errors.lastName?.message}</p>
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="on" disabled defaultValue={userData.email} />
      </div>
      <div className="flex flex-row-reverse justify-between pt-10">
        <SpinnerButton state={isSubmitting} type="submit" name="Save Changes" />

        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setValue("firstName", currentUserData.first_name);
            setValue("lastName", currentUserData.last_name);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
