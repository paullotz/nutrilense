import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  return (
    <>
      <Link href={"/signin"} className="underline">
        Signin
      </Link>
      <br />
      <br />
      {session ? (
        <>
          Logged in
          <br />
          <pre>{JSON.stringify(session, null, 4)}</pre>
        </>
      ) : (
        <>Logged out</>
      )}
    </>
  );
}
