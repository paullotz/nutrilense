"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  activityLevelLabels,
  genderLabels,
  goalLabels,
  ProfileFormSchema,
  ProfileFormSchemaType,
} from "@/lib/form";
import {
  genderEnum,
  goalEnum,
  activityLevelEnum,
  Profile,
} from "@/server/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { updateProfile as updateProfileMutation } from "@/server/actions";
import { Calculator, Loader2 } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { calculateCalories, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const UserProfile = ({
  profile,
  session,
}: {
  session: any;
  profile: Profile;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [calculateLoading, setCalculateLoading] = useState<boolean>(false);

  const updateProfile = useMutation({
    mutationFn: updateProfileMutation,
    onSuccess: () => {
      toast({
        title: "Nutrilense",
        description: "Profile has been updated.",
      });
      router.refresh();
    },
  });

  const onSubmit = (values: ProfileFormSchemaType) => {
    updateProfile.mutate(values);
  };

  const calculate = () => {
    setCalculateLoading(true);
    const values = form.getValues();
    const calories = calculateCalories(values);
    form.setValue("goalCalories", calories.toString());
    toast({
      title: "Nutrilense",
      description: "Calories have been calculated and set as calorie goal.",
    });
    setTimeout(() => {
      setCalculateLoading(false);
    }, 1000);
  };

  const form = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: session.user.name,
      height: profile.height,
      weight: profile.weight,
      goalCalories: profile.goalCalories,
      goal: profile.goal,
      gender: profile.gender,
      activityLevel: profile.activityLevel,
    },
  });

  return (
    <>
      <div className="container mx-auto mt-4 p-4">
        <nav className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-left">Nutrilense</h1>
          <UserAvatar session={session} />
        </nav>
        <div className="py-3" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription>This is your user name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>This is your height.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your current weight.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goalCalories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calorie goal</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>This is your calorie goal.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={profile.goal}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {goalEnum.enumValues.map((enumValue, index) => (
                        <SelectItem key={index} value={enumValue}>
                          {goalLabels[enumValue] || enumValue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>This is your general goal.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={profile.gender}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genderEnum.enumValues.map((enumValue, index) => (
                        <SelectItem key={index} value={enumValue}>
                          {genderLabels[enumValue] || enumValue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>This is your gender.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={profile.activityLevel}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activityLevelEnum.enumValues.map((enumValue, index) => (
                        <SelectItem key={index} value={enumValue}>
                          {activityLevelLabels[enumValue] || enumValue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is your activity level.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormItem>
                <FormLabel>Joined on</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    defaultValue={profile.createdAt.toLocaleString()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Last profile update</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    defaultValue={profile.updatedAt.toLocaleString()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending && (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                )}
                Update profile
              </Button>
              <Button
                type="button"
                onClick={calculate}
                variant={"secondary"}
                disabled={updateProfile.isPending}
              >
                <Calculator
                  className={cn("h-4 w-4 mr-2", {
                    "animate-spin": calculateLoading,
                  })}
                />
                Calculate calories
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
