import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = ({ params }) => {
  return [{ title: `Remix | PostId-${params.postId}` }];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const post = await response.json();
  return { post };
};

function PostId() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <div className="flex justify-between gap-5">
      <div className="flex-1 bg-slate-50 p-2 rounded-lg">
        <span className="text-teal-400 font-bold text-2xl">
          Number of post: {post.id}
        </span>
        <h1 className="border border-teal-400 p-3 rounded-md text-teal-400 text-lg">
          {post.title}
        </h1>
        <p>{post.body}</p>
      </div>
      {/* Comments  */}
      <Outlet />
    </div>
  );
}

export default PostId;
