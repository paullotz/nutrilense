"use client";

import { signOut } from "@/lib/auth-client";
import { IoExitOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface SignOutProps {
  text?: string;
  icon?: boolean;
}

export const SignOut = ({ text, icon = true }: SignOutProps) => {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={async () => {
          await signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/signin"); // redirect to login page
              },
            },
          });
        }}
        variant={"ghost"}
        size={icon ? "icon" : "default"}
      >
        {icon && <IoExitOutline className="h-[1.2rem] w-[1.2rem]" />}
        {text && <span>{text}</span>}
      </Button>
    </>
  );
};
