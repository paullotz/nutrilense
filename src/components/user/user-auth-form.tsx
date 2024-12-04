"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const callbackURL = "/onboarding";

export const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Button
        size={"lg"}
        variant="outline"
        className="w-full"
        onClick={async () => {
          await signIn.social({
            provider: "google",
            callbackURL,
          });
          setIsGoogleLoading(true);
          setIsLoading(true);
        }}
        disabled={isGoogleLoading || isLoading}
      >
        {isGoogleLoading ? (
          <CgSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="h-4 w-4 mr-2" />
        )}{" "}
        Continue with Google
      </Button>
      <Button
        size={"lg"}
        variant="outline"
        className="w-full"
        onClick={async () => {
          await signIn.social({
            provider: "github",
            callbackURL,
          });
          setIsGithubLoading(true);
          setIsLoading(true);
        }}
        disabled={isGithubLoading || isLoading}
      >
        {isGithubLoading ? (
          <CgSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGithub className="h-4 w-4 mr-2" />
        )}{" "}
        Continue with Github
      </Button>
    </div>
  );
};
