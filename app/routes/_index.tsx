import {
  redirect,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MainLayout from "~/layouts/main-layout";
import { authCookie } from "~/utils/cookies.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Bakr!" },
    { name: "description", content: "Bakr Description" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get("Cookie");
  const session = await authCookie.getSession(cookie);
  const userId = session.get("userId");
  
  if (!userId) {
    return redirect("/sign-in");
  }

  return { userId };
};

export default function Index() {
  const loader = useLoaderData();
  console.log(loader);
  return (
    <MainLayout>
      <div className="flex justify-center items-center h-screen flex-col gap-5">
        <h1>Welcome With my first tutorial in Remix.run</h1>
      </div>
    </MainLayout>
  );
}
