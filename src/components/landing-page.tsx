import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#565656,transparent_1px)]">
        <main className="container relative mx-auto">
          <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center">
            <div className="relative z-10 mx-auto max-w-[980px] text-center mt-10">
              <h1 className="recursive text-4xl font-bold leading-tight tracking-tighter md:text-7xl lg:leading-[1.2]">
                Track, reflect and scan
                <span className="block text-gray-400">all in one place</span>
              </h1>
              <p className="mt-6 text-lg md:text-2xl text-muted-foreground m-5">
                Effectively track your nutrition habits and enhance your
                well-being.
              </p>
              <Link
                href={"/signin"}
                className={cn(
                  "mt-10 bg-purple-500 font-bold",
                  buttonVariants({ variant: "default", size: "lg" }),
                )}
              >
                Get started
              </Link>
            </div>

            <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              <Image
                src={`/screenshot.png`}
                alt={"Application screenshot phone"}
                width="400"
                height="600"
              />
              <Image
                src={`/screenshot_two.png`}
                alt={"Application screenshot phone"}
                width="400"
                height="600"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
