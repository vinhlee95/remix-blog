import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPostListing, getPosts } from "~/models/post.server";

// New Awaited type to model async operations
// See https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#the-awaited-type-and-promise-improvements
type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListing>>
}

// Fetch posts from BE
export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
