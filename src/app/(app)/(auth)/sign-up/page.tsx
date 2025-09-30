import { SignUpView } from "@/modules/auth/ui/view/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await caller.auth.session();

  if (session.user) {
    redirect("/");
  }
  return <SignUpView />;
};

export default page;
