import { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Remix | Posts" }, { name: "description" }];
};

export const loader = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();
  return { posts };
};

type postDetailType = {
  id: number;
  title: string;
  body: string;
};

function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="font-bold text-2xl text-center mb-10">All Posts</h1>
      <div>
        <div className="flex justify-around items-center underline font-bold text-2xl text-blue-400">
          <h1>Title Posts</h1>
          <h1>Body Posts</h1>
        </div>
        {posts?.map((post: postDetailType) => {
          return (
            <Link
              to={`/posts/${post.id}/comments`}
              prefetch="intent"
              key={post.id}
              className="bg-slate-50 flex gap-4 my-3 p-4 rounded-lg"
            >
              <h1 className="text-gray-500 max-w-[300px] min-w-[300px]">
                {post.title}
              </h1>
              <p className="flex-1 ">{post.body}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
