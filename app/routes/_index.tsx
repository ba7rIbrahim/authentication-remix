import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Bakr!" },
    { name: "description", content: "Bakr Description" },
  ];
};

// export const loader: LoaderFunction = async () => {
//   const user = await getUsers();
//   return { user };
// };


export default function Index() {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-5">
      <h1>Welcome With my first tutorial in Remix.run</h1>
      <Link to="/posts" prefetch="intent">
        Go to posts
      </Link>
    </div>
  );
}
