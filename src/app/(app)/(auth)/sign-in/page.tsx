import { SignInView } from "@/modules/auth/ui/view/sign-in-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await caller.auth.session();

  if (session.user) {
    redirect("/");
  }

  return <SignInView />;
};

export default page;
