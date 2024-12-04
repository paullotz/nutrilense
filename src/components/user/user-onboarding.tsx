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
import { OnboardingFormSchema, OnboardingFormSchemaType } from "@/lib/form";
import { genderEnum, goalEnum, activityLevelEnum } from "@/server/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { insertProfile } from "@/server/actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserOnboarding = () => {
  const router = useRouter();
  const form = useForm<OnboardingFormSchemaType>({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      height: "170",
      weight: "60",
      goal: "gain_muscle",
      gender: "divers",
      activityLevel: "low",
      goalCalories: "2400",
    },
  });

  const createProfile = useMutation({
    mutationFn: insertProfile,
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = (values: OnboardingFormSchemaType) => {
    createProfile.mutate(values);
  };

  const goalLabels = {
    gain_muscle: "Gain muscle",
    loose_fat: "Loose fat",
    maintain: "Maintain",
  };

  const genderLabels = {
    male: "Male",
    female: "Female",
    divers: "Divers",
  };

  const activityLevelLabels = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  return (
    <>
      <div className="container mx-auto mt-4 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                    <Input type="number" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
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
                    <Input type="number" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                    defaultValue={field.value}
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
                  <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
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
                    defaultValue={field.value}
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
                  <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
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
                    defaultValue={field.value}
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
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={createProfile.isPending}>
              {createProfile.isPending && (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
