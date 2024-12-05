import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export const Footer = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    return <></>;
  }

  return (
    <footer>
      <div className="container mx-auto p-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/">
            <h1 className="mb-2 text-2xl font-bold sm:mb-0 recursive">
              Nutrilense
            </h1>
          </Link>
          <ul className="mb-6 flex flex-wrap items-center opacity-60 sm:mb-0">
            <Link href={"/"} className="mr-4 hover:underline md:mr-6">
              Overview
            </Link>
            <Link href={"/profile"} className="mr-4 hover:underline md:mr-6">
              Profile
            </Link>
          </ul>
        </div>
        <hr className="my-6 text-muted-foreground sm:mx-auto" />
        <div className="flex items-center justify-center">
          <div className="block text-sm text-muted-foreground sm:text-center">
            © {new Date().getFullYear()}{" "}
            <a
              target="_blank"
              href="https://github.com/paullotz/nutrilense"
              className="hover:underline"
            >
              Nutrilense
            </a>
            . All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
