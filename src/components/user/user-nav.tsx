import { SignOut } from "./user-signout";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FiMenu } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DarkModeToggle } from "../darkmode-toggle";

export const UserNavbar = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    throw new Error("No session found.");
  }

  return (
    <>
      <nav className="py-6 container mx-auto flex flex-row justify-between items-center">
        <div className="text-2xl font-bold ml-5 md:ml-3 recursive">Habits</div>
        <ul className="hidden md:flex container mx-auto flex-row gap-5 justify-center items-center">
          <li>
            <Link
              href={"/habits"}
              className={cn(
                "text-xl",
                buttonVariants({ variant: "ghost", size: "lg" }),
              )}
            >
              Habits
            </Link>
          </li>
          <li>
            <Link
              href={"/dash"}
              className={cn(
                "text-xl",
                buttonVariants({ variant: "ghost", size: "lg" }),
              )}
            >
              Dash
            </Link>
          </li>
          <li>
            <Link
              href={"/settings"}
              className={cn(
                "text-xl",
                buttonVariants({ variant: "ghost", size: "lg" }),
              )}
            >
              Settings
            </Link>
          </li>
        </ul>
        <div className="hidden justify-end md:flex flex-row items-center gap-1">
          <Avatar>
            <AvatarImage src={session.user.image} />
            <AvatarFallback>{session.user.name[0]}</AvatarFallback>
          </Avatar>
          <DarkModeToggle />
          <SignOut />
        </div>

        <div className="md:hidden mr-6 grid grid-cols-2">
          <DarkModeToggle />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"}>
                <FiMenu className={"h-6 w-6"} />{" "}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="mr-6">
              <ul className="grid gap-2 grid-cols-1">
                <li>
                  <Link
                    href={"/habits"}
                    className={cn(
                      "text-sm",
                      buttonVariants({ variant: "ghost" }),
                    )}
                  >
                    Habits
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/dash"}
                    className={cn(
                      "text-sm",
                      buttonVariants({ variant: "ghost" }),
                    )}
                  >
                    Dash
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/settings"}
                    className={cn(
                      "text-sm",
                      buttonVariants({ variant: "ghost" }),
                    )}
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <SignOut icon={false} text={"Signout"} />
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
      <hr />
    </>
  );
};
