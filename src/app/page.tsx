import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { CameraComponent } from "@/components/camera";
import { UploadButton } from "@/lib/uploadthing";

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
      <CameraComponent />
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
